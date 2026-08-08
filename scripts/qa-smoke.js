const fs = require("fs/promises");
const path = require("path");
const puppeteer = require("puppeteer");

const BASE_URL = process.env.QA_BASE_URL || "";
const OUT_DIR = path.resolve(process.cwd(), "docs/screenshots/puppeteer");

const PAGE_ROUTES = [
  { route: "/", slug: "home" },
  { route: "/about/", slug: "about" },
  { route: "/join/", slug: "join" },
  { route: "/performances/", slug: "performances" },
  { route: "/members/", slug: "members" },
  { route: "/donate/", slug: "donate" },
  { route: "/board-volunteers/", slug: "board-volunteers" },
  { route: "/documents/", slug: "documents" },
  { route: "/community-music-links/", slug: "community-music-links" },
  { route: "/locations/", slug: "locations" },
];

const MOBILE_ROUTES = [
  { route: "/", slug: "home" },
  { route: "/join/", slug: "join" },
  { route: "/board-volunteers/", slug: "board-volunteers" },
  { route: "/locations/", slug: "locations" },
  { route: "/performances/", slug: "performances" },
];

const APPROVED_JOIN_FORM_URL =
  "https://docs.google.com/forms/d/1nuJW-ZWfX4PpOa5TBXrIaNZX7z1w-D5yCEj5n_BbWLw/viewform";
const APPROVED_SCHEDULE_PDF_PATH = "/docs/acb-summer-2026-schedule.pdf";

function toAbsoluteUrl(baseUrl, route) {
  return new URL(route, baseUrl).toString();
}

function nowIso() {
  return new Date().toISOString();
}

async function detectBaseUrl() {
  if (BASE_URL) {
    return BASE_URL;
  }

  const candidates = ["http://localhost:8081", "http://localhost:8082"];

  for (const candidate of candidates) {
    try {
      const response = await fetch(candidate, { redirect: "manual" });
      if (response.status >= 200 && response.status < 500) {
        return candidate;
      }
    } catch (_error) {
      // Probe next candidate.
    }
  }

  throw new Error("Could not detect a running local preview URL on http://localhost:8081 or http://localhost:8082.");
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function captureDesktopScreenshots(page, report, baseUrl) {
  await page.setViewport({ width: 1366, height: 900, deviceScaleFactor: 1 });

  for (const entry of PAGE_ROUTES) {
    const targetUrl = toAbsoluteUrl(baseUrl, entry.route);
    const response = await page.goto(targetUrl, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    const status = response ? response.status() : null;
    const ok = response ? response.ok() : false;

    report.pagesTested.push({
      mode: "desktop",
      route: entry.route,
      url: targetUrl,
      status,
      ok,
    });

    if (!ok) {
      report.issues.push(`Desktop navigation failed for ${entry.route} (status: ${status ?? "none"}).`);
    }

    const screenshotPath = path.join(OUT_DIR, `desktop-${entry.slug}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    report.screenshots.push(screenshotPath);
  }
}

async function captureMobileScreenshots(page, report, baseUrl) {
  await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });

  for (const entry of MOBILE_ROUTES) {
    const targetUrl = toAbsoluteUrl(baseUrl, entry.route);
    const response = await page.goto(targetUrl, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    const status = response ? response.status() : null;
    const ok = response ? response.ok() : false;

    report.pagesTested.push({
      mode: "mobile",
      route: entry.route,
      url: targetUrl,
      status,
      ok,
    });

    if (!ok) {
      report.issues.push(`Mobile navigation failed for ${entry.route} (status: ${status ?? "none"}).`);
    }

    const screenshotPath = path.join(OUT_DIR, `mobile-${entry.slug}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    report.screenshots.push(screenshotPath);
  }
}

async function clickVisibleSelector(page, selector) {
  return page.evaluate((targetSelector) => {
    const candidates = Array.from(document.querySelectorAll(targetSelector));
    const visible = candidates.find((element) => {
      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);
      return (
        rect.width > 0 &&
        rect.height > 0 &&
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        !element.hasAttribute("disabled")
      );
    });

    if (!visible) {
      return false;
    }

    visible.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    return true;
  }, selector);
}

async function testModalOpenClose(page, report, baseUrl, route, openSelector, modalSelector, closeSelector, label) {
  const targetUrl = toAbsoluteUrl(baseUrl, route);
  await page.goto(targetUrl, { waitUntil: "networkidle2", timeout: 60000 });

  const hasOpenButton = (await page.$(openSelector)) !== null;
  if (!hasOpenButton) {
    report.issues.push(`${label}: open button not found on ${route}.`);
    report.checks[label] = { passed: false, detail: "Open button not found." };
    return;
  }

  const openClicked = await clickVisibleSelector(page, openSelector);
  if (!openClicked) {
    report.issues.push(`${label}: visible open button not clickable on ${route}.`);
    report.checks[label] = { passed: false, detail: "Visible open button not clickable." };
    return;
  }

  await page.waitForFunction(
    (selector) => {
      const modal = document.querySelector(selector);
      return Boolean(modal && modal.classList.contains("is-active") && modal.getAttribute("aria-hidden") === "false");
    },
    {},
    modalSelector,
  );

  const hasCloseButton = (await page.$(closeSelector)) !== null;
  if (!hasCloseButton) {
    report.issues.push(`${label}: close button not found after open on ${route}.`);
    report.checks[label] = { passed: false, detail: "Close button not found." };
    return;
  }

  const closeClicked = await clickVisibleSelector(page, closeSelector);
  if (!closeClicked) {
    report.issues.push(`${label}: visible close button not clickable on ${route}.`);
    report.checks[label] = { passed: false, detail: "Visible close button not clickable." };
    return;
  }

  await page.waitForFunction(
    (selector) => {
      const modal = document.querySelector(selector);
      return Boolean(modal && !modal.classList.contains("is-active") && modal.getAttribute("aria-hidden") === "true");
    },
    {},
    modalSelector,
  );

  report.checks[label] = { passed: true, detail: `Open/close successful on ${route}.` };
}

async function runAssertions(page, report, baseUrl) {
  await page.setViewport({ width: 1366, height: 900, deviceScaleFactor: 1 });

  await testModalOpenClose(
    page,
    report,
    baseUrl,
    "/",
    "[data-contact-modal-open]",
    "#contact-modal",
    "#contact-modal [data-contact-modal-close]",
    "contactModal",
  );

  await testModalOpenClose(
    page,
    report,
    baseUrl,
    "/",
    "[data-newsletter-modal-open]",
    "#newsletter-modal",
    "#newsletter-modal [data-newsletter-modal-close]",
    "newsletterModal",
  );

  await page.goto(toAbsoluteUrl(baseUrl, "/join/"), { waitUntil: "networkidle2", timeout: 60000 });
  const joinSignup = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll("a"));
    const target = links.find((link) => link.textContent && link.textContent.trim() === "Musician Signup Form");
    return target ? target.href : null;
  });

  if (!joinSignup) {
    report.issues.push("Join page: Musician Signup Form button not found.");
    report.checks.joinSignupForm = { passed: false, detail: "Button missing." };
  } else {
    const normalized = joinSignup.replace(/\/$/, "");
    const expected = APPROVED_JOIN_FORM_URL.replace(/\/$/, "");
    const passed = normalized === expected;
    if (!passed) {
      report.issues.push(`Join page: Musician Signup Form URL mismatch. Found ${joinSignup}`);
    }
    report.checks.joinSignupForm = {
      passed,
      detail: `Found URL: ${joinSignup}`,
    };
  }

  await page.goto(toAbsoluteUrl(baseUrl, "/locations/"), { waitUntil: "networkidle2", timeout: 60000 });
  const mapButtons = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll("a"));
    return {
      hasRehearsalMapButton: links.some((link) => link.textContent && link.textContent.includes("Open Rehearsal Location in Google Maps")),
      hasConcertMapButton: links.some((link) => link.textContent && link.textContent.includes("Open Concert Location in Google Maps")),
    };
  });

  const locationsPassed = mapButtons.hasRehearsalMapButton && mapButtons.hasConcertMapButton;
  if (!locationsPassed) {
    report.issues.push("Locations page: one or more map buttons are missing.");
  }
  report.checks.locationsMapButtons = {
    passed: locationsPassed,
    detail: JSON.stringify(mapButtons),
  };

  await page.goto(toAbsoluteUrl(baseUrl, "/performances/"), { waitUntil: "networkidle2", timeout: 60000 });
  const scheduleState = await page.evaluate((approvedPath) => {
    const bodyText = document.body ? document.body.textContent || "" : "";
    const hasApprovedDownloadButtonText = bodyText.includes("Download Summer 2026 Schedule PDF");
    const pdfLinks = Array.from(document.querySelectorAll("a"))
      .map((a) => a.getAttribute("href") || "")
      .filter((href) => /\.pdf(\?|$)/i.test(href));
    const hasApprovedPdfLink = pdfLinks.some((href) => href.startsWith(approvedPath));

    return {
      hasApprovedDownloadButtonText,
      hasApprovedPdfLink,
      pdfLinks,
    };
  }, APPROVED_SCHEDULE_PDF_PATH);

  const schedulePassed = scheduleState.hasApprovedDownloadButtonText && scheduleState.hasApprovedPdfLink;
  if (!schedulePassed) {
    report.issues.push("Performances page: approved schedule PDF check failed.");
  }
  report.checks.schedulePdf = {
    passed: schedulePassed,
    detail: JSON.stringify(scheduleState),
  };

  await page.goto(toAbsoluteUrl(baseUrl, "/"), { waitUntil: "networkidle2", timeout: 60000 });
  const hasFooterCredit = await page.evaluate(() => {
    const bodyText = document.body ? document.body.textContent || "" : "";
    return bodyText.includes("Website by Virginia Partridge");
  });

  if (!hasFooterCredit) {
    report.issues.push('Footer credit text "Website by Virginia Partridge" not found on home page.');
  }
  report.checks.footerCredit = {
    passed: hasFooterCredit,
    detail: "Checked home page footer text.",
  };
}

async function writeReports(report) {
  const jsonPath = path.join(OUT_DIR, "qa-report.json");
  const mdPath = path.join(OUT_DIR, "qa-report.md");

  await fs.writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  const lines = [
    "# Puppeteer Smoke QA Report",
    "",
    `- Generated: ${report.generatedAt}`,
    `- Base URL: ${report.baseUrl}`,
    `- Pages tested: ${report.pagesTested.length}`,
    `- Screenshots saved: ${report.screenshots.length}`,
    `- Issues found: ${report.issues.length}`,
    "",
    "## Checks",
    "",
  ];

  for (const [name, value] of Object.entries(report.checks)) {
    lines.push(`- ${name}: ${value.passed ? "PASS" : "FAIL"} (${value.detail})`);
  }

  lines.push("", "## Issues", "");

  if (report.issues.length === 0) {
    lines.push("- None");
  } else {
    for (const issue of report.issues) {
      lines.push(`- ${issue}`);
    }
  }

  lines.push("", "## Console Errors", "");

  if (report.consoleErrors.length === 0) {
    lines.push("- None");
  } else {
    for (const item of report.consoleErrors) {
      lines.push(`- [${item.type}] ${item.url}: ${item.text}`);
    }
  }

  lines.push("", "## Page Errors", "");

  if (report.pageErrors.length === 0) {
    lines.push("- None");
  } else {
    for (const item of report.pageErrors) {
      lines.push(`- ${item.url}: ${item.message}`);
    }
  }

  lines.push("", "## HTTP 4xx/5xx Responses", "");

  if (report.httpErrors.length === 0) {
    lines.push("- None");
  } else {
    for (const item of report.httpErrors) {
      lines.push(`- ${item.status} ${item.resourceType}: ${item.url}`);
    }
  }

  lines.push("", "## Screenshot Files", "");

  for (const screenshotPath of report.screenshots) {
    lines.push(`- ${path.relative(process.cwd(), screenshotPath)}`);
  }

  await fs.writeFile(mdPath, `${lines.join("\n")}\n`, "utf8");
}

async function main() {
  await ensureDir(OUT_DIR);

  const report = {
    generatedAt: nowIso(),
    baseUrl: "",
    pagesTested: [],
    screenshots: [],
    checks: {},
    issues: [],
    consoleErrors: [],
    pageErrors: [],
    httpErrors: [],
  };

  const baseUrl = await detectBaseUrl();
  report.baseUrl = baseUrl;

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      report.consoleErrors.push({
        type: msg.type(),
        text: msg.text(),
        url: page.url(),
      });
    }
  });

  page.on("pageerror", (error) => {
    report.pageErrors.push({
      url: page.url(),
      message: error.message,
    });
  });

  page.on("response", (response) => {
    const status = response.status();
    if (status >= 400) {
      const request = response.request();
      report.httpErrors.push({
        status,
        url: response.url(),
        resourceType: request.resourceType(),
      });
    }
  });

  try {
    await captureDesktopScreenshots(page, report, baseUrl);
    await captureMobileScreenshots(page, report, baseUrl);
    await runAssertions(page, report, baseUrl);
    await writeReports(report);

    console.log(`Smoke QA complete. Screenshots and reports saved to ${OUT_DIR}`);
    console.log(`Issues found: ${report.issues.length}`);

    if (report.issues.length > 0) {
      process.exitCode = 1;
    }
  } finally {
    await browser.close();
  }
}

main().catch(async (error) => {
  console.error("Smoke QA run failed:", error);
  process.exitCode = 1;
});

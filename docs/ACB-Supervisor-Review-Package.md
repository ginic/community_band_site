# ACB Supervisor Review Package

## 1. Review purpose
This document summarizes the current Amherst Community Band website update for supervisor review. It covers the full public site, not only the newest pages. It lists the sitemap, full page inventory, QA evidence, placeholders that remain intentionally inactive, and decisions still needed before final publication.

Answer to the core review question:
- All expected public pages currently exist in the repo.
- All expected public pages build successfully.
- The site passed the current smoke QA run.
- Some pages are review-ready, while others are intentionally placeholder-only or still require content approval.

## 2. Full public sitemap
This is the human review sitemap/page list.

- `/`
  Home
- `/about/`
  About
- `/join/`
  Join Us / Musician Signup
- `/performances/`
  Performances / Summer Schedule / Schedule PDF area
- `/members/`
  Members / rehearsal information
- `/donate/`
  Donate
- `/board-volunteers/`
  Board & Volunteers
- `/documents/`
  Public Documents
- `/community-music-links/`
  Community Music Links
- `/locations/`
  Locations & Directions

Technical sitemap note:
- The site does not currently generate a `sitemap.xml` file.

## 3. Full page inventory

### Home
- Page title: `Amherst Community Band`
- Public URL/path: `/`
- Source file path: `src/index.njk`
- Current status: ready
- What Virginia should review on that page:
  - Home page wording
  - Carousel images/captions
  - Welcome copy
  - Calls to action for Join, Performances, Members, and Donate
- Puppeteer screenshot exists: yes
- Screenshot path: `docs/screenshots/puppeteer/desktop-home.png`, `docs/screenshots/puppeteer/mobile-home.png`
- Remaining approval questions:
  - Is the wording and call-to-action emphasis correct?
  - Should any homepage content be shortened or reordered?

### About
- Page title: `About Us`
- Public URL/path: `/about/`
- Source file path: `src/about.njk`
- Current status: needs approval
- What Virginia should review on that page:
  - Public history wording
  - Historical images/captions
  - Board section content at the bottom
- Puppeteer screenshot exists: yes
- Screenshot path: `docs/screenshots/puppeteer/desktop-about.png`
- Remaining approval questions:
  - Is all reused public history content acceptable as-is?
  - Should the About page board section remain here in addition to Board & Volunteers?

### Join Us
- Page title: `Join the Amherst Community Band!`
- Public URL/path: `/join/`
- Source file path: `src/join.njk`
- Current status: ready
- What Virginia should review on that page:
  - Join wording
  - Rehearsal info wording
  - Musician Signup Form button/link
- Puppeteer screenshot exists: yes
- Screenshot path: `docs/screenshots/puppeteer/desktop-join.png`, `docs/screenshots/puppeteer/mobile-join.png`
- Remaining approval questions:
  - Is the approved public Google Form still the correct signup destination?
  - Does the join copy say enough, or too much?

### Performances
- Page title: `Performances`
- Public URL/path: `/performances/`
- Source file path: `src/performances.njk`
- Current status: needs approval
- What Virginia should review on that page:
  - Summer 2026 schedule entries
  - Schedule PDF wording and download behavior
  - Concert directions link
- Puppeteer screenshot exists: yes
- Screenshot path: `docs/screenshots/puppeteer/desktop-performances.png`, `docs/screenshots/puppeteer/mobile-performances.png`
- Remaining approval questions:
  - Are all schedule dates, times, and locations final?
  - Should the PDF remain downloadable now?

### Members
- Page title: `Information for Members`
- Public URL/path: `/members/`
- Source file path: `src/members.njk`
- Current status: needs approval
- What Virginia should review on that page:
  - Rehearsal/member wording
  - Rehearsal location/address
  - Calendar embed appropriateness
- Puppeteer screenshot exists: yes
- Screenshot path: `docs/screenshots/puppeteer/desktop-members.png`
- Remaining approval questions:
  - Is the public-facing member wording acceptable?
  - Should any member information be reduced before public use?

### Donate
- Page title: `Donate to the Amherst Community Band`
- Public URL/path: `/donate/`
- Source file path: `src/donate.njk`
- Current status: needs approval
- What Virginia should review on that page:
  - Donation wording
  - Zeffy link behavior
  - QR code visibility/placement
- Puppeteer screenshot exists: yes
- Screenshot path: `docs/screenshots/puppeteer/desktop-donate.png`
- Remaining approval questions:
  - Is Zeffy still the correct donation destination?
  - Is the donation pitch the right tone?

### Board & Volunteers
- Page title: `Board & Volunteers`
- Public URL/path: `/board-volunteers/`
- Source file path: `src/board-volunteers.njk`
- Current status: needs approval
- What Virginia should review on that page:
  - Board names and roles
  - Website credit and Virginia bio
  - Board contact/update-request flow
- Puppeteer screenshot exists: yes
- Screenshot path: `docs/screenshots/puppeteer/desktop-board-volunteers.png`, `docs/screenshots/puppeteer/mobile-board-volunteers.png`
- Remaining approval questions:
  - Are all names, roles, and the bio exactly correct?
  - Should any board/volunteer sections remain hidden or be expanded?

### Public Documents
- Page title: `Public Documents`
- Public URL/path: `/documents/`
- Source file path: `src/documents.njk`
- Current status: placeholder
- What Virginia should review on that page:
  - Placeholder structure only
  - Whether the page should remain visible before approved files are supplied
- Puppeteer screenshot exists: yes
- Screenshot path: `docs/screenshots/puppeteer/desktop-documents.png`
- Remaining approval questions:
  - What approved files belong here?
  - Should this page be hidden until documents exist?

### Community Music Links
- Page title: `Community Music Links`
- Public URL/path: `/community-music-links/`
- Source file path: `src/community-music-links.njk`
- Current status: placeholder
- What Virginia should review on that page:
  - Placeholder structure only
  - Whether the page should remain visible before approved links are supplied
- Puppeteer screenshot exists: yes
- Screenshot path: `docs/screenshots/puppeteer/desktop-community-music-links.png`
- Remaining approval questions:
  - What approved links belong here?
  - Should this page be hidden until links exist?

### Locations & Directions
- Page title: `Locations & Directions`
- Public URL/path: `/locations/`
- Source file path: `src/locations.njk`
- Current status: ready
- What Virginia should review on that page:
  - Rehearsal and concert locations
  - Address wording
  - Map embeds and directions links
- Puppeteer screenshot exists: yes
- Screenshot path: `docs/screenshots/puppeteer/desktop-locations.png`, `docs/screenshots/puppeteer/mobile-locations.png`
- Remaining approval questions:
  - Are all locations and directions links correct?
  - Should any location wording be made more specific?

## 4. Page-by-page review checklist
- Home: approve wording, layout, and calls to action.
- About: approve public history wording and image/caption reuse.
- Join Us: approve signup wording and Google Form destination.
- Performances: approve schedule details and PDF download behavior.
- Members: approve rehearsal/member wording and public-facing detail level.
- Donate: approve donation wording and Zeffy/QR code presentation.
- Board & Volunteers: approve names, roles, bio, and website credit.
- Public Documents: decide whether to leave visible as placeholder or hide until content exists.
- Community Music Links: decide whether to leave visible as placeholder or hide until content exists.
- Locations & Directions: approve addresses, maps, and directions links.

## 5. Shared site features
- Header / navigation
- Mobile menu
- Footer
- Contact button and demo-only popup
- Newsletter placeholder popup
- Musician Signup Google Form link
- Locations & Directions maps/buttons
- Schedule PDF area
- Shared footer credit: Website by Virginia Partridge
- Puppeteer QA script/report/screenshots

## 6. Completed work summary
### Layout structure
- Established shared page layouts and consistent container structure.
- Added reusable regular and wide content templates.

### Mobile menu
- Improved mobile navigation behavior and accessibility.

### Home page structure
- Built the homepage around a hero area, welcome section, concert/rehearsal summary, action cards, and sponsor/grant acknowledgment.

### Regular and wide content templates
- Applied reusable templates so public pages share a consistent structure and spacing pattern.

### Footer / Facebook / newsletter button
- Added a shared footer with public links, Facebook link, newsletter trigger, and Virginia website credit.

### Join Us musician signup page/link
- Reworked Join Us into a public musician-interest page.
- Linked the Musician Signup button to the approved public Google Form viewform URL only.

### Contact popup demo
- Added a click-only Contact modal.
- Kept it clearly demo-only and intentionally inactive.

### Locations & Directions page
- Added a dedicated page for rehearsal and concert locations.
- Included map embeds and Google Maps buttons.

### Board & Volunteers page
- Added the public board structure and public role/name content.
- Kept Virginia listed under Website.

### Virginia website credit and bio
- Added shared footer credit: Website by Virginia Partridge.
- Added the approved Virginia website-role bio on Board & Volunteers.

### Performances schedule area
- Created a Performances page with summer schedule content.
- Added the approved downloadable Summer 2026 schedule PDF area.

### Puppeteer smoke QA setup and report
- Added a Puppeteer smoke QA script and package command.
- Captured desktop and mobile review screenshots.
- Produced machine-readable and markdown QA reports.

## 7. Summer 2026 schedule status
Approved schedule information currently reflected in the site:

### Rehearsals
- Mondays, June 8 through August 17, 2026
- 6:00-8:00pm
- Parks Band Building
- 110 Grinnell Road
- Amherst, MA 01003

### Concerts and events
- Saturday, June 27, 2026, 6:30-8:00pm, Concert at Sweetser Park
- Friday, July 3, 2026, 8:00-10:00pm, Amherst Fireworks at UMass Amherst
- Saturday, July 25, 2026, 6:30-8:00pm, Concert at Sweetser Park
- Saturday, August 15, 2026, 6:30-8:00pm, Concert at Sweetser Park
- Tuesday, August 18, 2026, 6:30-8:00pm, Best of the Summer Concert at South Amherst Common

### Locations
- Sweetser Park, Main St, Amherst, MA
- UMass Amherst
- South Amherst Common, Amherst, MA

### Schedule PDF status
- The approved PDF has been added to the repo at `docs/acb-summer-2026-schedule.pdf`.
- It is linked from the Performances page download area.

## 8. QA evidence
Referenced QA artifacts:
- Script: `scripts/qa-smoke.js`
- Package script: `qa:smoke`
- Report: `docs/screenshots/puppeteer/qa-report.md`
- JSON report: `docs/screenshots/puppeteer/qa-report.json`
- Screenshots folder: `docs/screenshots/puppeteer/`

Summary:
- Pages tested: 15
- Screenshots captured: 15
- Issues: 0
- Console errors: 0
- HTTP 4xx/5xx responses: 0

## 9. Screenshot references
- Home: desktop + mobile
- About: desktop
- Join Us: desktop + mobile
- Performances: desktop + mobile
- Members: desktop
- Donate: desktop
- Board & Volunteers: desktop + mobile
- Public Documents: desktop
- Community Music Links: desktop
- Locations & Directions: desktop + mobile

## 10. Placeholder status
- Public Documents: placeholder page
- Community Music Links: placeholder page
- Newsletter modal: placeholder-only
- Contact modal submission: placeholder/demo-only

## 11. Items intentionally still inactive
These items were intentionally left inactive to avoid publishing unapproved endpoints, documents, links, or contact information.

- Formspree contact form
- Public email fallback
- Newsletter signup
- Public Documents content
- Community Music Links content

Note:
- The Schedule PDF download is no longer inactive because the approved PDF has now been added and linked.

## 12. Contact status
- Contact modal is demo-only for now.
- Formspree is not active.
- No public email fallback should be added yet.
- Do not display a raw Gmail address publicly unless Virginia approves it.
- If an email fallback is later approved, prefer a button/link that does not visibly print the raw email address on the page.
- Final contact method requires Virginia's approval.

## 13. Newsletter status
- Newsletter modal is placeholder-only.
- No signup destination/provider is connected.
- Needs approved provider or signup link before activation.

## 14. Public Documents status
- Public Documents page exists as placeholder/review structure.
- No public documents should be added until approved files are supplied.

## 15. Community Music Links status
- Community Music Links page exists as placeholder/review structure.
- No external links should be added until approved.

## 16. Items Virginia needs to approve
Virginia review checklist:
- Approve sitemap/page list.
- Approve top navigation and footer links.
- Approve home page wording and layout.
- Approve About page public wording.
- Approve Join Us page and musician signup Google Form link.
- Approve Performances schedule wording, dates, times, locations, and PDF availability.
- Approve Members page public wording.
- Approve Donate page wording and link behavior.
- Approve Board & Volunteers names, roles, and bios.
- Approve website credit: Website by Virginia Partridge.
- Approve Locations & Directions page.
- Decide contact method:
  - Keep demo-only for now
  - Activate Formspree later
  - Approve a public email fallback later
- Decide newsletter signup plan.
- Supply approved Public Documents, if any.
- Supply approved Community Music Links, if any.
- Confirm whether any pages should be hidden before public release.

## 17. Suggested review order
1. Home page
2. Performances / Summer Schedule
3. Join Us
4. Locations & Directions
5. Board & Volunteers
6. About / Members / Donate
7. Contact and Newsletter placeholders
8. Public Documents and Community Music Links placeholders
9. Mobile view
10. Final QA screenshots/report

## 18. Risk controls already followed
- No fake Formspree endpoint
- No fake newsletter provider
- No invented schedule times
- No invented public documents
- No invented community links
- No raw public email posted
- Existing visual style kept conservative
- Puppeteer smoke QA passed before supervisor review

## 19. Remaining risks / open questions
- Is the sitemap/page list correct?
- Should any page be hidden before launch?
- Is the final Summer 2026 schedule approved?
- Is the schedule PDF approved for download?
- What should the Contact form do?
- Should Formspree Free be used?
- Should an email fallback be added, and if so how should spam risk be handled?
- Is there an approved newsletter signup link/provider?
- What files belong under Public Documents?
- What links belong under Community Music Links?
- Are all names, roles, bios, and credits correct?

## 20. Do not change these in this PR
Do not:
- Activate Formspree.
- Add a public email address.
- Activate newsletter signup.
- Add public documents.
- Add community links.
- Change the Join Us Google Form link.
- Change Virginia's bio or footer credit.
- Change schedule content unless fixing formatting.
- Make broad design changes.
- Run `npm audit fix`.

## 21. Testing
Commands run:
- `npm run build`
- `npm run qa:smoke`

Current known QA coverage includes the schedule PDF download area via the smoke report's `schedulePdf` check.

## 22. Files changed in this PR
- `Changelog.md`
- `docs/ACB-Supervisor-Review-Package.md`
- `/Users/macbookpro/Downloads/acb/docs/CHANGELOG.md`

## 23. Build / QA results
- Build result: PASS (`npm run build` completed successfully after documentation update)
- QA result: PASS (`npm run qa:smoke` completed successfully with 0 issues)
- Changed screenshot/report paths: none
- Open approval items: see Sections 16 and 19

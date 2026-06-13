const Image = require("@11ty/eleventy-img");

module.exports = (config) => {
    const siteBasePath = process.env.SITE_BASE_PATH || "";

    config.addFilter("withBase", function(value) {
        if (!value) {
            return siteBasePath || "/";
        }

        if (/^(?:[a-z]+:)?\/\//i.test(value) || value.startsWith("mailto:") || value.startsWith("#")) {
            return value;
        }

        const normalizedBasePath = siteBasePath.endsWith("/")
            ? siteBasePath.slice(0, -1)
            : siteBasePath;
        const normalizedValue = value.startsWith("/") ? value : `/${value}`;

        return `${normalizedBasePath}${normalizedValue}`;
    });

    config.addPassthroughCopy("src/_images");
    config.addPassthroughCopy("src/_css");
    config.addPassthroughCopy("docs");

    // Add responsive image shortcode
    config.addAsyncShortcode("image", async function(src, alt, sizes = "100vw", className = "") {
        const metadata = await Image(src, {
            widths: [400, 800, 1200, "auto"],
            formats: ["avif", "webp", "jpeg", "png"],
            outputDir: "./_site/img/",
            urlPath: `${siteBasePath || ""}/img/`,
        });

        const imageAttributes = {
            alt,
            sizes,
            loading: "lazy",
            decoding: "async",
            ...(className && { class: className }),
        };

        return Image.generateHTML(metadata, imageAttributes);
    });

    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: './src',
            data: '../_data',
            includes: '../_includes'
        },
    };
};
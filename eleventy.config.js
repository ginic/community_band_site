const Image = require("@11ty/eleventy-img");

module.exports = (config) => {
    config.addPassthroughCopy("src/_images");
    config.addPassthroughCopy("src/_css");

    // Add responsive image shortcode
    config.addAsyncShortcode("image", async function(src, alt, sizes = "100vw") {
        const metadata = await Image(src, {
            widths: [320, 640, 960, 1200, 1800, null],
            formats: ["jpeg", "png"],
            outputDir: "./_site/img/",
            urlPath: "/img/",
        });

        const imageAttributes = {
            alt,
            sizes,
            loading: "lazy",
            decoding: "async",
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
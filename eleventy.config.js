module.exports = (config) => {
    config.addPassthroughCopy("src/_images");
    config.addPassthroughCopy("src/_css");

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
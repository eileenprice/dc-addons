module.exports = {
    options: {
        config: '.jscsrc'
    },
    src: {
        src: [
            '<%= config.src %>/**/*.js',
        ]
    },
    grunt: {
        src: [
            'Gruntfile.js',
            '<%= config.grunt %>/**/*.js'
        ]
    }
};

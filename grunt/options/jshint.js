module.exports = {
    options: {
        jshintrc: '.jshintrc',
    },
    src: [
        '<%= config.src %>/**/*.js',
    ],
    grunt: [
        'Gruntfile.js',
        '<%= config.grunt %>/**/*.js'
    ]
};

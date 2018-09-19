module.exports = {
    options: {
        sourceMap: false,
        screwIE8: true,
        preserveComments: 'some'
    },
    build: {
        files: [{
            expand: true,
            cwd: '<%= config.dist %>/',
            src: '**/*.js',
            dest: '<%= config.dist %>/',
            ext: '.min.js'
        }]
    }
};

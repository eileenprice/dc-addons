module.exports = {
    options: {
        stripBanners: true,
        sourceMap: false,
        banner: '/*!\n * <%= config.pkg.name %> v<%= config.pkg.version %>\n ' +
                '*\n * <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\n *\n */\n'
    },
    bubble: {
        dest: '<%= config.dist %>/dc-bubble-cloud.js',
        src: [
            '<%= config.src %>/bubble-cloud.js',
        ]
    }
};

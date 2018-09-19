module.exports = function (grunt) {
    grunt.registerTask('build', [
        'notify:build',
        'jshint:src',
        'jshint:grunt',
        'jscs:src',
        'jscs:grunt',
        'clean:build',
        'concat',
        'uglify:build',
        'notify:buildComplete'
    ]);
};

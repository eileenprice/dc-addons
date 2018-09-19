module.exports = function (grunt) {
    grunt.registerTask('test', [
        'jshint:src',
        'jshint:grunt',
        'jscs:src',
        'jscs:grunt'
    ]);
};

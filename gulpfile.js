var gulp = require('gulp'),
	concat = require('gulp-concat');

gulp.task('default', function() {
	gulp.src(['src/core/struct.js', 'src/lib/*.js', 'src/default.js', 'src/game/*.js', 'src/core/main.js'])
	.pipe(concat('game.js'))
	.pipe(gulp.dest('./bin/'));
});

gulp.task('watch', function() {
	gulp.watch('src/**/*.js', ['default']);
});
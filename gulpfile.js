var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");

gulp.task("scripts", function () {
  gulp.src(['./src/js/lib/*.js', './src/js/main.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./src/js/dist/'))
});


gulp.task('watch', function () {
    gulp.watch(['./src/js/main.js'], ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);

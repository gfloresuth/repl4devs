var gulp = require('gulp');
var ts = require('gulp-typescript');

const DEST = "build/"

gulp.task('default', function () {
    return gulp.src('src/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            out: 'output.js'
        }))
        .pipe(gulp.dest(DEST+'local'));
});
const gulp = require('gulp');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

function compileTS() {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('.n8n/custom/Random/dist'));
}

function copySVG() {
  return gulp.src('.n8n/custom/Random/src/icon.svg')
    .pipe(gulp.dest('.n8n/custom/Random/dist'));
}

exports.build = gulp.series(compileTS, copySVG);

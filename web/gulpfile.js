const { src, dest } = require('gulp');

// const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglyfy = require('gulp-uglify');
const minify = require('gulp-minify');
const cleanCss = require('gulp-clean-css');


const source = 'src';
const target = 'dist';
const style = 'style.css';
const script = 'script.js';

const images = () => src([`${source}/**/*.webp`])
    .pipe(dest(target));

const htmls = () => src([`${source}/**/*.html`])
    .pipe(dest(target));

const styles = () => src([
    'node_modules/bootstrap/dist/css/bootstrap.css',
    'node_modules/bootstrap-icons/font/bootstrap-icons.css',
    'src/assets/css/*.cs'])
    .pipe(concat(style))
    .pipe(cleanCss())
    .pipe(dest(`${target}/assets/css`));

const scripts = () => src([
    'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
    'node_modules/angular/angular.js',
    'node_modules/angular-route/angular-route.js',
    'node_modules/angular-sanitize/angular-sanitize.js',
    `${source}/**/*.js`])
    .pipe(concat(script))
    .pipe(uglyfy())
    .pipe(minify({ ext: { min: '.js' }, noSource: true }))
    .pipe(dest(`${target}/assets/js`));

exports.default = () => images() &&
    htmls() &&
    styles() &&
    scripts();
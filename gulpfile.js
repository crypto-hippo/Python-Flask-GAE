const gulp        = require('gulp'),
    browser_sync     = require('browser-sync').create(),
    reload          = browser_sync.reload,
    gulp_sass        = require('gulp-sass'),
    directory_exists = require('directory-exists'),
    cp              = require('child_process'),
    exec            = cp.exec,
    include       = require('gulp-include'),
    error_handler   = require('gulp-error-handle');

    // uglify          = require('gulp-uglify-es').default,
    // gulp_sass        = require('gulp-sass'),
    // clean           = require('gulp-clean'),
    // error_handler   = require('gulp-error-handle'),
    // gutil           = require('gulp-util'),
    // cp              = require('child_process'),
    // exec            = cp.exec,

const js_src_dir = "main/static/src/js"

const paths = {
    src_scss: "main/static/src/scss/*.scss",
    dev_css_dir: "main/static/dev/css",
    fonts: "main/static/fonts",
    html: "main/templates/**/*.html",
    lib: "main/lib",
    prod_folder: "main/static/prod",
    dev_folder: "main/static/dev",
    dev_js_dir: "main/static/dev/js",
    base_js: "main/static/src/js/base.js",
    src_js: [js_src_dir + "/*.js", "!" + js_src_dir + "/base.js"],
    font_awesome_fonts: "node_modules/font-awesome/fonts/*",

};

gulp.task('default', ['pip:install'], function() {
    
});

gulp.task('reload', [], () => {
    reload();
});

gulp.task('build:dev:js', ['build:js:includes'], function(cb) {
    gulp.src(paths.src_js).pipe(gulp.dest(paths.dev_js_dir))
    return cb();
});

gulp.task('build:dev:css', ['build:fonts'], function(cb) {
    gulp.src([
        paths.src_scss
    ])
    .pipe(error_handler(handle_error))
    .pipe(gulp_sass())
    .pipe(gulp.dest(paths.dev_css_dir));
    return cb();
});

gulp.task('build:fonts', [], (cb) => {
    directory_exists(paths.fonts).then(result => {
        if (!result) {
            gulp.src(paths.font_awesome_fonts)
            .pipe(gulp.dest(paths.fonts))
        }
    });
    return cb();
});

gulp.task("clean", [], (cb) => {
    gulp.src([paths.prod_folder, paths.dev_folder], {read: false})
    .pipe(clean());
});

gulp.task('pip:install', [], function(cb) {
    exec('pip install -t main/lib -r requirements.txt', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
    cb();
});

gulp.task('build:js:includes', function(cb) {
    directory_exists(paths.dev_js_dir).then(result => {
        if (!result) {
            gulp.src(paths.base_js)
            .pipe(include({
                includePaths: [
                    "node_modules"
                ]
            }))
            .pipe(error_handler(handle_error))
            .pipe(gulp.dest(paths.dev_js_dir));
        }
    });

    return cb();
});

gulp.task("gae-watch", ["build:dev:css", "build:dev:js"], () => {
    browser_sync.init({
        proxy: "localhost:8080",
        port: "3001"
    });
    gulp.watch(paths.src_scss, ["build:dev:css", "reload"]);
    gulp.watch(paths.src_js, ['build:dev:js', "reload"]);
    gulp.watch(paths.base_js, ['build:js:includes', "reload"]);
    gulp.watch(paths.html, ['reload']);
    // gulp.watch(paths.html, ["build:reload"]);
    // gulp.watch(paths.devjs, ["build:reload"]);
});

const handle_error = function(error) {
    gutil.log(error);
    this.emit('end');
};




var gulp = require('gulp');

var $ = require('gulp-load-plugins')();



gulp.task('js',function(){
   gulp.src('./src/js/*.js')
       .pipe($.babel({presets:["es2015"]}))
       .pipe($.concat('all.js'))

       .pipe(gulp.dest('./build1/js1'))
       .pipe($.uglify())
       .pipe($.rename(function (file) {
          file.basename+='.min';
       }))
       .pipe(gulp.dest('./build1/js1'))
});



gulp.task('css',function(){
   gulp.src('./src/less/*.less')
       .pipe($.less())
       .pipe($.concat('all.css'))
       .pipe(gulp.dest('./build1/css1'))
       .pipe($.cleanCss())
       .pipe($.rename('all.min.css'))
       .pipe(gulp.dest('./build1/css1'))

});
gulp.task('images',function(){
    gulp.src('./src/imgs/*.png')
        .pipe(gulp.dest('build1/imgs'))
});
gulp.task('html',function(){


        var target = gulp.src('./src/index.html');
        var sources = gulp.src(['./build1/**/*.js', './build1/**/*.css']);
        return target.pipe($.inject(sources,{ignorePath:'/build1/'}))
            .pipe(gulp.dest('./build1'));

});
gulp.task('server',function(){
   $.connect.server({
      root:'build1',
      port:8080,
      livereload:true
   });
});
gulp.task('watch',function(){
   gulp.watch('./src/index.html',['html']);
});
gulp.task('default', ['js', 'css', 'images',
   'html', 'server', 'watch']);




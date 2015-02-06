// develop path: "./"
// build path:  "dist"

// task order
//- Clean dist directory
//- Copy file to dist directory
//- Compile less, sass, coffee script into dist directory
//- Concat css, js both to be single file in dist directory
//- Compressor css and js file in dist directory
//- Injector css and js file to html

var ngrok = require("ngrok");

module.exports = function (grunt){
    // auto-load npm task components
    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('./package.json'),

        // clean directory
        clean: {
            build: ["dist"]
        },

        // copy file to dist directory
        copy: {
            build: {
                files: [
                    {src: [ 'assets/images/**', 'index.html'], dest: 'dist/'}
                ]
            }
        },

        // less compiler
        less: {
            build: {
                files: {
                    "dist/assets/css/main.css" : "assets/css/*.less"
                }
            }
        },

        // concat and compressor css
        cssmin: {
            build: {
                files: [{
                    'dist/assets/css/main.min.css': ['assets/css/*.css', 'dist/assets/css/*.css']
                }]
            }
        },

        // concat js
        concat: {
            build: {
                src:'assets/js/main.js',
                dest:'dist/assets/js/main.js'
            }
        },

        // compressor js
        uglify: {
            build: {
                src:'assets/js/*.js',
                dest:'dist/assets/js/main.min.js'
            }
        },

        // injector js and css files to html
        injector: {
            options: {
                // Task-specific options go here.
            },
            css: {
                options: {
                    relative: true,
                    transform: function (filePath){
                        var filePath = filePath.replace('/dist/', '');
                        return '<link rel="stylesheet" href="' + filePath + '" />';
                    },
                    starttag: '<!-- injector:css -->',
                    endtag: '<!-- endinjector -->'
                },
                files: {
                    'dist/index.html': ['dist/assets/css/main.min.css']
                }
            },
            js: {
                options: {
                    relative: true,
                    transform: function (filePath){
                        var filePath = filePath.replace('/dist/', '');
                        return '<script src="' + filePath + '"></script>';
                    },
                    starttag: '<!-- injector:js -->',
                    endtag: '<!-- endinjector -->'
                },
                files: {
                    'dist/index.html': ['dist/assets/js/main.min.js']
                }
            }
        },

        // pagespeed
        pagespeed: {
            options: {
                nokey: true,
                url: "http://localhost:63342/geyang/index.html"
            },
            prod: {
                options: {
                    locale: "en_GB",
                    strategy: "desktop",
                    threshold: 90
                }
            },
            paths: {
                options: {
                    locale: "en_GB",
                    strategy: "desktop",
                    threshold: 90
                }
            }
        }
    });

    // define task
    grunt.registerTask('cleanDir', ['clean:build']); //ok
    grunt.registerTask('copyFileToDist', ['copy:build']); //ok
    grunt.registerTask('compileLess', ['less:build']); //ok
    grunt.registerTask('concatCompressorCss', ['cssmin:build']); //ok
    grunt.registerTask('makeJs', ['concat:build', 'uglify:build']); //ok
    grunt.registerTask('injectFileToHtml', ['injector']); //ok
    // main task
    grunt.registerTask('deploy', ['cleanDir', 'copyFileToDist', 'compileLess', 'concatCompressorCss', 'makeJs', 'injectFileToHtml']);

    // performance test
    // Register customer task for ngrok
    grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
        var done = this.async();
        var port = 8111;

        ngrok.connect(port, function(err, url) {
            if (err !== null) {
                grunt.fail.fatal(err);
                return done();
            }
            grunt.config.set('pagespeed.options.url', url);
            grunt.task.run('pagespeed');
            done();
        });
    });
    grunt.registerTask("ps", ["pagespeed"]);
};
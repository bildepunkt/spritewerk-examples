var gulp = require("gulp");
var webpack = require("gulp-webpack");
var fs = require("fs");
var path = require("path");

function getDirs (root) {
    var list = fs.readdirSync(root);

    return list.map((dir)=> {
        return path.join(root, dir, "main.js");
    });
}

function transpile (entry, out) {
    console.log(`transpiling ${entry} to ${out}`);

    return gulp.src(entry)
        .pipe(webpack({
            output: {
               filename: "bundle.js",
            },
            devtool: "source-map",
            module: {
                loaders: [
                    {
                        test: /.js?$/,
                        loader: "babel-loader",
                        exclude: /node_modules/,
                        query: {
                            presets: ["es2015"]
                        }
                    }
                ]
            }
        }))
        .pipe(gulp.dest(out));
}

gulp.task('watch-js', function () {
    var entries = getDirs(path.join("./", "pages"));
    var watcher = gulp.watch(entries);

    watcher.on('change', function (event) {
        transpile(event.path, event.path.replace("main.js", ""));
    });
});

gulp.task("xpile-js", function () {
    var entries = getDirs(path.join("./", "pages"));

    return entries.forEach(function (entry) {
        transpile(entry, entry.replace("main.js", ""));
    });
});

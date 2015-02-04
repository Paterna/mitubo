var busboy = require('connect-busboy');
var fs = require('fs');
var models = require('../models');
var child_process = require('child_process');
var exec = child_process.exec;

exports.view = function(req, res) {
    res.render('upload');
}


exports.upload = function(req, res, next) {
	
    res.locals.video;
    res.locals.extension;
    var child;
    var fstream;

    req.pipe(req.busboy);

    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Subiendo vídeo: " + filename);

        var video_extension = /(.*)\.(.*)/.exec(filename)[2];
        console.log('Nombre del vídeo: ' + req.body.nombre);
        console.log('Extensión del vídeo: ' + video_extension);
        var video = new models.Video({
			name: filename,
            extension: video_extension
		});

		video.save(function(err, video_file) {
			if (err) {
				console.log('Error al subir el vídeo: ' + err);
                return res.end(err);
            }
            console.log('Vídeo subido: ' + JSON.stringify(video));
            res.locals.video = video;
            
            res.locals.extension = video_extension;

            console.log('Vídeo: %s', JSON.stringify(res.locals.video));
            console.log('Extensión: %s', res.locals.extension);

            fstream = fs.createWriteStream('/root/mitubo/videos/' + video_file._id + "." + video_extension);

            file.pipe(fstream);
            fstream.on('close', function () {
                var command = 'scp /root/mitubo/videos/' + video_file._id + '.' + video_extension + ' root@s1:/mnt/nas/';
                child = exec(command, function(error, stdout, stderr) {
                    console.log('Vídeo subido al NAS: %s', command);
                });
                // child = exec('rm /root/mitubo/videos/' + video_file._id + '.' + video_extension);
            });
                
            next();
		});
        
    });
}

exports.list = function(req, res, next) {

    res.locals.videos = [];

    models.Video.find({},
        function(err, videos) {
            if (err) {
                console.log("Error: %s", err);
            }
            else {
                res.locals.videos = videos;
                next();
            }
        });
}

exports.play = function(req, res, next) {

    res.locals.video;
    var video_id = req.params.id;
    var child;


    models.Video.find({ _id: video_id },
        function(err, video) {
            if (err) {
                console.log("Error: %s", err);
            }
            res.locals.video = video[0];
            console.log("Vídeo para reproducir: %s", res.locals.video);
            next();
        });
}
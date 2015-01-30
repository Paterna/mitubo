var busboy = require('connect-busboy');
var fs = require('fs');
var models = require('../models');

exports.view = function(req, res) {
    res.render('upload');
}


exports.upload = function(req, res, next) {
	
    var video_name = req.body.nombre;
    // console.log('Nombre del vídeo: ' + video_name);

	var fstream;
    req.pipe(req.busboy);

    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Subiendo vídeo: " + filename);

        var video = new models.Video({
			name: video_name
		});

		video.save(function(err, video_file) {
			if (err) {
				console.log('Error al subir el vídeo: ' + err);
                return res.end(err);
            }
            console.log('Vídeo subido: ' + JSON.stringify(video));
            res.locals.video = {
                _id: video._id,
                name: video.name
            };
            extension_check = /(.*)\.(.*)/;
            var video_extension = extension_check.exec(filename);
            res.locals.extension = video_extension[2];

            console.log('Vídeo: %s', JSON.stringify(res.locals.video));
            console.log('Extensión: %s', res.locals.extension);

            video_name = video_file._id + filename
            fstream = fs.createWriteStream('/mnt/nas/' + video_file._id + "." + video_extension[2]);
	        file.pipe(fstream);
	        fstream.on('close', function () {});
            next();
		});
        
    });
}
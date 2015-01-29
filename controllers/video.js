var busboy = require('connect-busboy');
var fs = require('fs');
var models = require('../models');


exports.upload = function(req, res, next) {
	
	var fstream;
    req.pipe(req.busboy);

    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Subiendo vídeo: " + filename); 

        var video = new models.Video({
			name: filename
		});
		
		video.save(function(err, video) {
			if (err) {
				console.log('Error al subir el vídeo: ' + err);
                return res.end(err);
            }
            else {
                console.log('Vídeo subido: ' + video.name);
                res.locals.video = {
                    name: video.name
                };
                fstream = fs.createWriteStream('/home/roberto/mitubo/videos/' + filename);
		        file.pipe(fstream);
		        fstream.on('close', function () {
		            
		        });
                next();
            }
		});
        
    });
}
var http = require('http');
var messages = [];

var onRequest = function(req, res){
	if(req.method === 'GET'){
		res.writeHead(200, {
			'Connection': 'close',
			'Connect-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		});
	res.end(JSON.stringify(messages));
	}
	if(req.method === 'POST'){
		var message = '';
		req.on('data', function(chunk){
			message = {'text': chunk.toString()};
		});
		req.on('end', function(){
			console.log('POST Data Recieved: ' + message);
			messages.push(message);
		})
	}
	if(req.method === 'OPTIONS'){
		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
	    	'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
	    	'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
	    });
	    res.end();
	}
}

http.createServer(onRequest).listen(8001);
var lib = {
	http:require('http'),
	url:require('url')
};

var config = {
	hostname:'178.62.39.204',
	port:8121
};

var admin = lib.http.createServer(function(p_request, p_response) {
	console.log('REQUEST RECEIVED');
	console.log(p_request.url);
	console.log(p_request.method);
	console.log(p_request.headers);

	var proxyRequest = lib.http.request(
		{
			hostname:config.hostname,
			port:config.port,
			method:p_request.method,
			path:p_request.url,
			headers:p_request.headers
		},
		function(p_res) {
			console.log('RESPONSE RECEIVED');
			console.log(p_res.statusCode);
			console.log(p_res.headers);

			p_response.writeHead(p_res.statusCode, p_res.headers);
			p_res.pipe(p_response);
		}
	);

	p_request.pipe(proxyRequest);
});

admin.on('error', function(p_error) {
	console.log('ERROR', p_error);
});

admin.listen(80);
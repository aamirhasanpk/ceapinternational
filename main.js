
var fs = require('fs');
var path = require('path');
var cors = require('cors');
var app = require('express')();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var savefile = 'settings9kw.json';
var firstdata = 0;
var captchadata = "";
var captchacookies = "";
var captchaanswer = "";

//"oldsource":"recaptchav1","securetoken":null,"proxy":"","pageurl":"","cookies":"","proxytype":""
var socks = require('socksv5');

var srv = socks.createServer(function(info, accept, deny) {
	if(info.dstPort === 80 || info.dstPort === 443){
		//console.log(info.dstAddr);
		if(
			info.dstAddr != 'www.9kw.eu' && 
			info.dstAddr != 'funcaptcha.com' && 
			info.dstAddr != 'www.funcaptcha.com' && 
			!info.dstAddr.match(/funcaptcha.com/) &&
			info.dstAddr != 'coinhive.com' && 
			info.dstAddr != 'coin-hive.com' && 
			info.dstAddr != 'www.coinhive.com' && 
			info.dstAddr != 'www.coin-hive.com' && 
			info.dstAddr != 'www.authedmine.com' && 
			!info.dstAddr.match(/authedmine.com/) &&
			info.dstAddr != 'authedmine.com' && 
			info.dstAddr != 'www.google.com' && 
			info.dstAddr != 'www.gstatic.com' && 
			info.dstAddr != 'ajax.googleapis.com' && 
			info.dstAddr != 'fonts.gstatic.com'
		){
			var socket;
			    if (socket = accept(true)) {
			      socket.end([
			        'HTTP/1.1 200 OK',
			        'Connection: close',
			        'Content-Type: text/html',
			        'Access-Control-Allow-Origin: *',
				'Access-Control-Allow-Headers: X-Requested-With',
				'Access-Control-Allow-Methods: GET,PUT,POST,DELETE,OPTIONS',
				'Cookies: '+captchacookies,
			        'Content-Length: ' + Buffer.byteLength(captchadata),
			        '',
			        captchadata
			      ].join('\r\n'));
			    }
			//info.dstAddr = 'localhost';
			//info.dstPost = '12345';
		}
		accept();
	}else{
		deny();
	}
});
srv.listen(12346, 'localhost', function() {
	console.log('SOCKS server listening on port 12346');
});
srv.useAuth(socks.auth.None());
app.listen(12345, 'localhost');
app.use(cors());
app.use(bodyParser());
app.use(require('express').static(__dirname + '/static'));
app.get('*', function (req, res) {
	//console.log(req.url);
	res.set('Content-Type', 'text/html');
	if(req.url == '/load/settings'){
		res.sendfile(__dirname + '/' + savefile);
	}else if(req.url.match("^/load/captchaanswer")){
		if(captchaanswer != ""){
			res.send(new Buffer(captchaanswer));
			captchadata = "";
			captchaanswer = "";
			captchacookies = "";
		}
	}else if(req.url != '/' && fs.existsSync(__dirname + '/' + req.url)){
		res.sendfile(__dirname + '/' + req.url);
	}else{
		if(firstdata != 2 && fs.existsSync(__dirname + '/' + savefile) && savefile.length > 1){
			var filedata = fs.readFileSync(__dirname + '/index.html', "utf8");
			var content = fs.readFileSync(__dirname + '/' + savefile, "utf8");
			var config9kw = JSON.parse(content);
			filedata = filedata.replace(/__apikey__/g,config9kw['apikey'])
			filedata = filedata.replace(/__widthc__/g,config9kw['widthc'])
			filedata = filedata.replace(/__heightc__/g,config9kw['heightc'])

			if(config9kw['startpre'] == 1){
				filedata = filedata.replace(/__startpre__/,'checked')
			}
			if(config9kw['rc2audio'] == 1){
				filedata = filedata.replace(/__rc2audio__/,'checked')
			}
			if(config9kw['refresh'] == 1){
				filedata = filedata.replace(/__refresh__/,'checked')
			}
			if(config9kw['speed'] == 1){
				filedata = filedata.replace(/__speed__/,'checked')
			}
			if(config9kw['speedlevel'] == 0){
				filedata = filedata.replace(/__speedlevel0__/,'selected')
			}else{
				filedata = filedata.replace(/__speedlevel0__/,'')
			}
			if(config9kw['speedlevel'] == 1){
				filedata = filedata.replace(/__speedlevel1__/,'selected')
			}else{
				filedata = filedata.replace(/__speedlevel1__/,'')
			}
			if(config9kw['speedlevel'] == 2){
				filedata = filedata.replace(/__speedlevel2__/,'selected')
			}else{
				filedata = filedata.replace(/__speedlevel2__/,'')
			}
			if(config9kw['speedlevel'] == 3){
				filedata = filedata.replace(/__speedlevel3__/,'selected')
			}else{
				filedata = filedata.replace(/__speedlevel3__/,'')
			}

			if(config9kw['zoom'] == 100){
				filedata = filedata.replace(/__zoom100__/,'selected')
			}else{
				filedata = filedata.replace(/__zoom100__/,'')
			}
			if(config9kw['zoom'] == 105){
				filedata = filedata.replace(/__zoom105__/,'selected')
			}else{
				filedata = filedata.replace(/__zoom105__/,'')
			}
			if(config9kw['zoom'] == 110){
				filedata = filedata.replace(/__zoom110__/,'selected')
			}else{
				filedata = filedata.replace(/__zoom110__/,'')
			}
			if(config9kw['zoom'] == 115){
				filedata = filedata.replace(/__zoom115__/,'selected')
			}else{
				filedata = filedata.replace(/__zoom115__/,'')
			}
			if(config9kw['zoom'] == 120){
				filedata = filedata.replace(/__zoom120__/,'selected')
			}else{
				filedata = filedata.replace(/__zoom120__/,'')
			}
			if(config9kw['zoom'] == 125){
				filedata = filedata.replace(/__zoom125__/,'selected')
			}else{
				filedata = filedata.replace(/__zoom125__/,'')
			}

			if(config9kw['flip'] == 1){
				filedata = filedata.replace(/__flip__/,'checked')
			}
			if(config9kw['mirror'] == 1){
				filedata = filedata.replace(/__mirror__/,'checked')
			}
			if(config9kw['desktop'] == 1){
				filedata = filedata.replace(/__desktop__/,'checked')
			}
			if(config9kw['sound'] == 1){
				filedata = filedata.replace(/__sound__/,'checked')
			}
			if(config9kw['popup'] == 1){
				filedata = filedata.replace(/__popup__/,'checked')
			}
			if(config9kw['grau'] == 1){
				filedata = filedata.replace(/__grau__/,'checked')
			}
			if(config9kw['autostart'] == 1){
				filedata = filedata.replace(/__autostart__/,'checked')
			}
			if(config9kw['desktopinfo'] == 1){
				filedata = filedata.replace(/__desktop__/,'checked')
			}
			if(config9kw['textselect'] == 1){
				filedata = filedata.replace(/__textcaptcha__/,'checked')
			}
			if(config9kw['textonlyselect'] == 1){
				filedata = filedata.replace(/__textonlycaptcha__/,'checked')
			}
			if(config9kw['confirmselect'] == 1){
				filedata = filedata.replace(/__confirmcaptcha__/,'checked')
			}
			if(config9kw['puzzleselect'] == 1){
				filedata = filedata.replace(/__puzzlecaptcha__/,'checked')
			}
			if(config9kw['rotateselect'] == 1){
				filedata = filedata.replace(/__rotatecaptcha__/,'checked')
			}
			if(config9kw['audioselect'] == 1){
				filedata = filedata.replace(/__audiocaptcha__/,'checked')
			}
			if(config9kw['interactiveselect'] == 1){
				filedata = filedata.replace(/__interactivecaptcha__/,'checked')
			}
			if(config9kw['mouseselect'] == 1){
				filedata = filedata.replace(/__mousecaptcha__/,'checked')
			}
			if(config9kw['multimouseselect'] == 1){
				filedata = filedata.replace(/__multimousecaptcha__/,'checked')
			}

			firstdata = 2;
			for (var prop in config9kw) {
			    //if (config9kw.hasOwnProperty(prop)) {
				filedata = filedata.replace('__'+prop+'__','')
			    //}
			}
			res.send(new Buffer(filedata));
		}else{
			if(firstdata == 2 || firstdata == 1){
				if(captchacookies != ""){
					res.set('Cookies', captchacookies);
				}
				res.send(new Buffer(captchadata));
			}else{
				firstdata == 1;
				res.sendfile(__dirname + '/index.html');
			}
		}
	}
});
app.post('*', function (req, res) {
	res.set('Content-Type', 'text/html');
	if(req.url == '/save/captchadata'){
		var newdata = JSON.parse(req.body.jsondata);
		captchadata = newdata.jsondata;
		captchacookies = newdata.newcookies;
		res.send(new Buffer('OK'));
	}else if(req.url == '/save/funcaptcha'){
		var newdata = req.body;
		captchacookies = "";
		captchaanswer = "";
		captchadata = "";
		captchaanswer = req.body['fc-token'];
		res.send(new Buffer('OK'));
	}else if(req.url == '/save/captchaanswer'){
		var newdata = req.body;
		captchacookies = "";
		captchaanswer = "";
		captchadata = "";
		captchaanswer = newdata.answer;
		res.send(new Buffer('OK'));
	}else if(req.url == '/save/settings'){
		//console.log(req.body['jsondata']);
		//var savefilePath = path.join(nw.App.dataPath, savefile);
		var savefilePath = path.join(__dirname, savefile);

		fs.writeFile(savefilePath, req.body.jsondata, function(e) {
			if(e){
				return console.log(e);
			}
			//console.log("The file "+savefilePath+" is saved!");
		}); 
	}
});
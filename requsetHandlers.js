//var exec = require("child_process").exec;
var querystring =require("querystring");
var fs = require("fs");
var formidable =require("formidable");

function start(response,request){
	console.log("Request handler start is called");
	var body ='<html>'+
	'<head>'+
	'<meta http-equiv="Content-Type" content="text/html;'+
	'charset=UTF-8" />'+
	'</head>'+
	'<body>'+
	'<form action ="/upload" enctype="multipart/form-data" '+' method="post"> '+
	'<input type="file" name="upload"> '+
	'<input type="submit" value="Upload file"/>'+
	'</form>'+
	'</body>'+
	'</html>';
	response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	response.write(body);
	response.end();
}

function upload(response,request){
	console.log("Request handler upload is called ");

	var form =new formidable.IncomingForm();
	form.uploadDir ="tmp";
	console.log("about to parse");
	form.parse(request,function(error,fields,files){
		console.log(files);
		fs.renameSync(files.upload.path,"./"+form.uploadDir+"/test.png");
		response.writeHead(200,{"content-type":"text/html"});
		response.write("received image:<br/>");
		response.write("<img src='/show' />");
		response.end();
	});

}

function show(response,request){
	console.log("request handler show was called");
	fs.readFile("./tmp/test.png","binary",function(error,file){
		if(error){
			response.writeHead(500,{"content-type":"text/plain;charset=utf-8"});
			response.write(error +"\n");
			response.end();
		}else {
			response.writeHead(200,{"content-type":"image/png"});
			response.write(file,"binary");
			response.end();
		}
	});
}

exports.start =start;
exports.upload =upload;
exports.show =show;
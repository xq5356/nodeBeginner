var server =require("./server");
var router =require("./router");
var requestHandlers =require("./requsetHandlers");
var handle ={}
handle["/"] =requestHandlers.start;
handle["/start"] =requestHandlers.start;
handle["/upload"] =requestHandlers.upload;
handle["/favicon.ico"] =requestHandlers.start;
handle["/show"] =requestHandlers.show;

server.start(router.route,handle);
var fs = require('fs');
var http=require('http');

var server=http.createServer(handleRequest);
server.listen(3000,()=>console.log('Server start!'));

function handleRequest(request,response){
    response.setHeader=('content-type','text/plain');
    fs.createReadStream('./readme.txt').pipe(response);
    // fs.readFile('./readme.txt',(err,content)=>{
    //     response.write(content);
    //     response.end();
    // });
}
var path=require('path');
console.log(__filename);
console.log(__dirname+'/app.js');
console.log('./index.html');
console.log(path.join(__dirname,'./index.html'));


var http=require('http');
var qs=require('querystring');


var server=http.createServer(handlRequest);
server.listen(3000,()=>console.log('Server listening on port 3000'));

function handlRequest(request,response){
    var dataFormat=request.headers['content-type'];
    var store='';
    response.setHeader('Content-type','text/html');
    request.on('data',(chunk)=>{
        store=store+chunk;
    });

    request.on('end',()=>{
        if(request.method==='POST' && request.url==='/' && dataFormat==='application/json'){
            response.statusCode=201;
            var parsedData=JSON.parse(store);
            var name=parsedData['name'];
            var email=parsedData['email'];
            console.log(name,email);
            response.write(`<h1>${name}</h1><h2>${email}</h2>`);
            response.end();
        }

        if(request.method==='POST' && request.url==='/' && dataFormat==='application/x-www-form-urlencoded'){
            response.statusCode=201;
            var parsedData=qs.parse(store);
            var email=parsedData['email'];
            response.write(`<h2>${email}</h2>`);
            response.end();
        }
        
    });
}
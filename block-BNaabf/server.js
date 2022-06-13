var http=require('http');
var fs=require('fs');
var qs=require('querystring');
const { parse } = require('path');

var server=http.createServer(handleRequest);
server.listen(5678,()=>console.log('Server listening at port 5678'));

function handleRequest(request,response){

    var store='';
    request.on('data',(chunk)=>{
        store=store+chunk;
    });
    
    request.on('end',()=>{
        if(request.method==='GET' && request.url==='/form'){
            response.setHeader('Content-type','text/html');
            fs.createReadStream('./form.html').pipe(response);
        }
        else if(request.method==='POST' && request.url==='/form'){
            var parsedData=qs.parse(store);
            response.setHeader('Content-type','text/html');
            response.write(`<h2>${parsedData.userName}</h2>`);
            response.write(`<h2>${parsedData.userMail}</h2>`);
            response.write(`<h2>${parsedData.userAge}</h2>`);
            response.end();
        }
    })
    

    }

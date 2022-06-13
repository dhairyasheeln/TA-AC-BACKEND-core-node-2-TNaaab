var http=require('http');
var fs=require('fs');

var server=http.createServer(handleRequest);
server.listen(5678,()=>console.log('Server listening at port 5678'));

function handleRequest(request,response){
    if(request.method==='GET' && request.url==='/form'){
        console.log(request.url);
        response.setHeader('Content-type','text/html');
        fs.readFile('./form.html',(err,content)=>{
            response.write(content);
            response.end();
        })

    }
    else if(request.method==='POST'){
        console.log('Form submitted');
    }
}
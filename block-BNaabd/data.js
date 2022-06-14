var http=require('http');
var server=http.createServer(handleRequest);
server.listen(7000,()=>console.log('Server is listening on port 7000'));

function handleRequest(request,response){
    response.end(request.headers['content-type'])
}
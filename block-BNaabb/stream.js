var http=require('http');var server=http.createServer(handleRequest);
server.listen(3456,()=>console.log('Server Started!'));

function handleRequest(request,response){
    var store='';
    request.on('data',(chunk)=>{
        store=store+chunk;
    });
    request.on('end',()=>{
        console.log(store);
        response.write(store);
        response.end();
    })
    
}

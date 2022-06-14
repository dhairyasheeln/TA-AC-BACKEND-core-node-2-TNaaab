
var http=require('http');
var path=require('path');
var fs=require('fs');
var url=require('url');


const userDir=path.join(__dirname,'users/');


var server=http.createServer(handleRequest);
server.listen(3000,()=>console.log('Server listening at Port 3000'));

function handleRequest(request,response){
    var store='';
    parsedUrl=url.parse(request.url,true);
    var pathname=parsedUrl.pathname;

    request.on('data',(chunk)=>{
        store=store+chunk;
    });

    request.on('end',()=>{
        console.log(store);
        let username=parsedUrl.query.username;
        var userDirPath=`${userDir}${username}.json`;

        if(request.method==='POST' && pathname==='/users'){
            let parsedData=JSON.parse(store);
            let username=parsedData.username;
            let userFile=`${userDir}${username}`;
            fs.open(userFile+'.json','wx',(err,fd)=>{
                if(err){
                    console.log(err);
                }
                else{
                    fs.writeFile(fd,store,(err)=>{
                        if(err){
                            console.log('File not written properly');
                        }
                        else{
                            console.log('File written');
                            fs.close(fd,(err)=>{
                                if(!err){
                                    response.end(`${username} created successfully`);
                                }
                            })
                        }
                    })
                }
            })
        }
        else if(request.method==='GET' && pathname==='/users')
        {
            fs.readFile(userDirPath,(err,content)=>{
                response.write(content);
                response.end();
            })  
        }
        else if(request.method==='DELETE' && pathname==='/users'){
            fs.unlink(userDirPath,(err)=>{
                if(err){
                    throw err;
                }
                else{
                    console.log('File Deleted');
                    response.end(`${username} deleted`);
                }
            }); 
        }

        else if(request.method==='PUT' && pathname==='/users'){
            fs.open(userDirPath,'r+',(err,fd)=>{
                if(err){
                    throw err;
                }
                else{
                    fs.ftruncate(fd,(err)=>{
                        if(err){
                            throw err;
                        }
                        else{
                            fs.writeFile(fd,store,(err)=>{
                                if(err){
                                    throw err;
                                }
                                else{
                                    console.log('File Modified');
                                    fs.close(fd,(err)=>{
                                    if(!err){
                                    response.end(`${username} modified successfully`);
                                    }
                                    })
                                }
                            })
                        }
                    })
                }
            })
            }

        });
}

const fs = require('fs');
const http = require('http');

fs.writeFile('index.html','<h1> Hello World </h1>\n <p> This is Mahesh... </p>',(err)=>{
    console.log(err);
});

const server = http.createServer((req,res)=>{
    fs.readFile('index.html','utf-8',(err,data)=>{
        res.writeHead(200, {"content-type": "text/html"});
        res.write(data);
        res.end();
    });
})

server.listen(5000, ()=>console.log("serverr started..."));
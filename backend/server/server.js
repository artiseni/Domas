const http = require('http')
const fs = require('fs')
const qs = require('querystring')
const users = require("../controller/users")

const port = 3000
const succ = 200

http.createServer((rq, rs) => {
    
    rs.setHeader('Access-Control-Allow-Origin', '*');
    rs.setHeader('Access-Control-Request-Method', '*');
    rs.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    rs.setHeader('Access-Control-Allow-Headers', '*');
    rs.setHeader('Content-type', 'application/json')
    const isJson = rq.headers['content-type'] == 'application/json'
    const url = rq.url === '' ? '/index' : rq.url


    if (isJson){  
        if (rq.method.toLowerCase() === 'get'){
            switch (url) {
                case '/data':
                    users.getAll(rs)
                break;
                case '/login':
            
                break;
                case '/index':
           
                break;
                default:
                
                break;
            } 
        } else if (rq.method.toLowerCase() === 'post') {
            switch (url) {
                case '/login':
            
                break;
                case '/signup':
              
                break;
                case '/home':
            
                break;
                case '/data':
                    // users.addOne(rq, rs)
                    // users.searchData(rq, rs)
                    users.optionPost(rq, rs)
                break;
                default:

                break;
            } 
        } else if (rq.method.toLowerCase() === 'delete') {
            switch (url) {
                case '/data':
                    users.deleteOne(rq, rs)
                break;
            } 
        } else if (rq.method.toLowerCase() === 'put') {
            switch (url) {
                case '/data':
                    users.updateOne(rq, rs)
                break;
            } 
        }

    }else{
        rs.setHeader('status', 404)
        rs.end(JSON.stringify({ message: "Not found!" }))
    }

}).listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})

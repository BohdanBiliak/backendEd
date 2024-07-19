const http = require('http')


let Count = 0
const server = http.createServer((req, res) => {
  Count++

  switch (req.url) {

    case '/students':
        res.write('DOVBOEB')
        break;
    default:
        res.write('404 not found')
  }
    res.write("Nastia-Lox: " + Count)  
    res.end()

})

 server.listen(3003)
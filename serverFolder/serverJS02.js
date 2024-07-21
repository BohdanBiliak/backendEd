
const http = require('http')
const fs = require('fs')


const server = http.createServer((req, res) => {

    switch (req.url) {

        case '/students': {

            fs.readFile('pages/xhome.html', (err, data) => {
                if (err) res.write('some error')
                else res.write(data) 
                res.end()
            })
            
           
            break;
        }
        case '/about': {

            const data = fs.readFileSync('pages/about.html')
            res.write(data)
            res.end()
            break;
        }
        default: {
            res.write('404 not found')
            res.end()

        }
    }
    
})

server.listen(3003)
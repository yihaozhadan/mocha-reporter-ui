const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { join } = require('path')
const fs = require('fs')
const parser = require('xml2json')

const port = parseInt(process.env.PORT, 10) || 3003
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const filePath = './static/test-report.xml';

app.prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      const rootStaticFiles = [
        '/test-report.xml',
      ]
      if (rootStaticFiles.indexOf(parsedUrl.pathname) > -1) {
        const path = join(__dirname, 'static', parsedUrl.pathname)
        app.serveStatic(req, res, path)
      } else if (parsedUrl.pathname === '/test') {
        fs.readFile(filePath, (err, data) => {
          if (err) throw err;
          var json = parser.toJson(data);
          res.write(json);
          res.end();
        });
      } else {
        handle(req, res, parsedUrl)
      }
    })
      .listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
      })
  })
const express = require('express');
const next = require('next');
const fs = require('fs');
const xml2js = require('xml2js');

const parser = new xml2js.Parser({ mergeAttrs: true });

const port = parseInt(process.env.PORT, 10) || 3003;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const filePath = './static/test-report.xml';

app
  .prepare()
  .then(() => {
    const server = express();
    server.get('/test', (req, res) => {
      fs.readFile(filePath, (error, data) => {
        if (error) { throw error; }
        parser.parseString(data, (err, result) => {
          if (err) {
            console.error(err.stack);
            res.sendStatus(500);
          }
          res.send(result);
        });
      });
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) { throw err; }
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

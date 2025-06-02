const { exec } = require("child_process");
const path = require("path");
const httpServer = require("http-server");

// Folder gde se nalazi index.html
const folderToServe = path.join(__dirname);
const port = 8091;

// Otvori browser (Windows)
exec(`start http://localhost:${port}/html/index.html`);

// Kreiraj i pokreni server
const server = httpServer.createServer({ root: folderToServe });

server.listen(port, () => {
  console.log(`Tic Tac Toe je pokrenut na http://localhost:${port}`);
});


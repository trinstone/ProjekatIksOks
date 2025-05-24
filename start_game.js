const { exec } = require("child_process");
const path = require("path");
const http = require("http-server");

// Folder where index.html is
const folderToServe = path.join(__dirname);
const port = 8080;

// Open browser (Windows)
exec(`start http://localhost:${port}/index.html`);

// Create and start the server
const server = http.createServer({ root: folderToServe });
server.listen(port, () => {
  console.log(`Tic Tac Toe launched at http://localhost:${port}`);
});
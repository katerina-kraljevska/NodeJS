import http from "node:http";
import EventEmitter from "node:events";
import fs from "fs";

class StudentEmitter extends EventEmitter {}
const studentEmitter = new StudentEmitter();

studentEmitter.on("studentAdded", (studentName) => {
  console.log(`New student added: ${studentName}`);
  fs.appendFile("students.txt", studentName + "\n", (err) => {
    if (err) console.error(err);
  });
});

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Welcome to the Basic HTTP Server</h1>");
  } else if (req.method === "GET" && req.url === "/student") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(
      "<h1><p>Student Name: Katerina</p><p> Lastname: Kraljevska</p><p> Academy: Qinshift Academy</p><p> Subject: Node.js</p></h1>"
    );
  } else if (req.method === "GET" && req.url === "/add_student") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(
      "<form action='/all_students' method='POST'><input type='text' name='student_name' placeholder='Enter student name' required><button type='submit'>Submit</button></form>"
    );
  } else if (req.method === "POST" && req.url === "/all_students") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const studentName = new URLSearchParams(body).get("student_name");
      studentEmitter.emit("studentAdded", studentName);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`<h1>Student ${studentName}</h1>`);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});

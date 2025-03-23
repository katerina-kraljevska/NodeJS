import * as fs from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";
import {
  editUser,
  deleteUser,
  getUserById,
  addUser,
  deleteAll,
} from "./userServices.js";
import { json } from "stream/consumers";

const __dirName = dirname(fileURLToPath(import.meta.url));
const file_Path = `${__dirName}/homework.txt`;

// WRITE FILE
const writeFileAsync = async (filePath, content) => {
  try {
    await fs.writeFile(filePath, content, "utf-8");
    console.log(`File written successfully: ${filePath}`);
    return JSON.parse(data);
  } catch (error) {
    console.log(`Error writing file: ${error.message}`);
  }
};

await writeFileAsync(file_Path, "Homework 02 in Basic Node JS");

// APPEND FILE
const appendFileAsync = async (filePath, content) => {
  try {
    await fs.appendFile(filePath, `\n${content}`, "utf-8");
    console.log(`Content appended to file successfully: ${filePath}`);
  } catch (error) {
    console.log(`Error appending file: ${error.message}`);
  }
};

await appendFileAsync(file_Path, "FINISHED");

// READ FILE
const readFileAsync = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    console.log(`Content read successfully: ${filePath}\nContent: ${data}`);
  } catch (error) {
    console.log(`Error reading file: ${error.message}`);
  }
};

await readFileAsync(file_Path);

//TEST
const newUser = {
  name: "Katerina",
  username: "kate01",
  password: "password1",
};

addUser(newUser);
addUser(newUser);
editUser(3, { name: "new name", username: "New username", password: "pass12" });
deleteUser(5);
deleteAll();

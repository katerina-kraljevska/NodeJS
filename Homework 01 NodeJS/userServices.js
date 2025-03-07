import { error } from "console";
import fs from "fs";

// Function to read existing users from users.json file
try {
  const existingUsers = fs.readFileSync("users.json", "utf8");
  const parsedUsers = JSON.parse(existingUsers);
  console.log(parsedUsers);
} catch (error) {
  console.log("Error reading file", error);
}

const getUserById = (userId) => {
  const existingUsers = fs.readFileSync("users.json", "utf8");
  const parsedUsers = JSON.parse(existingUsers);
  const foundUser = parsedUsers.find((user) => user.id === userId);
  return foundUser ?? {};
};

const foundUser = getUserById(100);
console.log(foundUser);

//ADD USER
const addUser = (user) => {
  const existingUsers = fs.readFileSync("users.json", "utf8");
  const parsedUsers = JSON.parse(existingUsers);
  const newUserId = parsedUsers.length + 1;
  const newUser = {
    id: newUserId,
    name: user.name,
    username: user.username,
    email: user.email,
  };
  parsedUsers.push(newUser);
  fs.writeFileSync("users.json", JSON.stringify(parsedUsers), null, 2);
};

//EDIT USER
function editUser(findId, user) {
  const existingUsers = fs.readFileSync("users.json", "utf8");
  const parsedUsers = JSON.parse(existingUsers);
  parsedUsers.find((user) => user.id === findId);
  parsedUsers[findId] = { ...parsedUsers[findId], ...user };
  fs.writeFileSync("users.json", JSON.stringify(parsedUsers), null, 2);
}

//DELETE USER

function deleteUser(id) {
  const existingUsers = fs.readFileSync("users.json", "utf8");
  const parsedUsers = JSON.parse(existingUsers);
  parsedUsers.filter((user) => user.id !== id);
  fs.writeFileSync("users.json", JSON.stringify(parsedUsers), null, 2);
}

//DELETE ALL

function deleteAll() {
  const existingUsers = fs.readFileSync("users.json", "utf8");
  const parsedUsers = JSON.parse(existingUsers);
  parsedUsers.forEach((user) => (user = {}));
  fs.writeFileSync("users.json", JSON.stringify(parsedUsers), null, 2);
  console.log("All users deleted");
}

export { editUser, deleteUser, getUserById, addUser, deleteAll };

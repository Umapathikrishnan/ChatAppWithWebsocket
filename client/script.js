const ws = new WebSocket("ws://localhost:8080");

// Function to prompt for username
function promptForUsername() {
  let username = prompt("Please enter your name");
  if (username == null || username.trim() === "") {
    username = "Anonymous";
  }
  localStorage.setItem("username", username);
  return username;
}

// Ask for username if not stored in localStorage
let username = localStorage.getItem("username");
// if (!username) {
username = promptForUsername();
// }

ws.onopen = (e) => {
  console.info("connection established successfully..");
};
ws.onmessage = function ({ data }) {
  console.info("message from server/clients::", data);
  let x = document.createElement("h3");
  const obj = JSON.parse(data);
  x.textContent = `${obj.name} : ${obj.message}`;
  document.getElementById("list").appendChild(x);
};
ws.onclose = (e) => {
  console.warn("connection closed...");
};
ws.onerror = (e) => {
  console.error("Error ::", e);
};

function sendMessage() {
  const message = document.getElementById("message").value;
  ws.send(JSON.stringify({ name: username, message }));
}

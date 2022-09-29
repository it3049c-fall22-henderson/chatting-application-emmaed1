// creating references
const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");
const saveButton = document.getElementById("save-button")
const editButton = document.getElementById("edit-button")
const serverURL = `https://it3049c-chat-application.herokuapp.com/messages`;

function DarkMode(){
    document.body.classList.toggle("dark-mode");
    localStorage.darkMode = true;
}
updateMessages()
const MILLISECONDS_IN_TEN_SECONDS = 10000;
setInterval(updateMessages, MILLISECONDS_IN_TEN_SECONDS);

function fetchMessages() {
    return fetch(serverURL)
        .then( response => response.json())
}

function updateMessagesInChatBox(){
  updateMessages()
}

function formatMessage(message, myNameInput) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

  if (myNameInput === message.sender) {
      return `
      <div class="mine messages">
          <div class="message">
              ${message.text}
          </div>
          <div class="sender-info">
              ${formattedTime}
          </div>
      </div>
      `
  } else {
      return `
          <div class="yours messages">
              <div class="message">
                  ${message.text}
              </div>
              <div class="sender-info">
                  ${message.sender} ${formattedTime}
              </div>
          </div>
      `
  }
}
async function updateMessages() {
  // Fetch Messages
  const messages = await fetchMessages();
  // Loop over the messages. 
  let formattedMessages = "";
  messages.forEach(message => {
      formattedMessages += formatMessage(message, nameInput.value);
  });
  chatBox.innerHTML = formattedMessages;
}
function  Messages(username, text) {
  const newMessage = {
      sender: username,
      text: text,
      timestamp: new Date()
  }

  fetch (serverURL, {
      method: `POST`, 
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMessage)
  });
}
sendButton.addEventListener("click", function(sendButtonClickEvent) {
  sendButtonClickEvent.preventDefault();
  const sender = nameInput.value;
  const message = myMessage.value;

  sendMessages(sender,message);
  myMessage.value = "";
});
localStorage.getItem("my-name-input");
saveButton.onclick = function() {  
    localStorage.setItem('my-name-input', nameInput.value);
    if(localStorage.getItem('my-name-input') < 1){
        document.getElementById('my-message').disabled = true;
    }else{
        document.getElementById("my-message").disabled = false;
    }
}
editButton.onclick = function(){
    const names = localStorage.getItem("my-name-input");
    nameInput.value = names;
}
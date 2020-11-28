class Controller {
  constructor() {
    this.model = new MessageList([], "");
    this.userList = new UserList(
      ["mama", "papa"],
      ["mama", "papa", "baba", "deda"]
    );
    this.headerView = new HeaderView("nickname");
    this.messagesView = new MessagesView("messages-list");
    this.activeUsersView = new ActiveUsersView("active-users");
  }
  // myFunction(value) {
  //   alert(value);
  // }
  setCurrentUser(user) {
    this.model.user = user;
    this.headerView.display(user);
    this.messagesView.display(this.model.getPage(), user);
    this.userList.addUser(user);
    console.log(this.userList);
    document.getElementById("login-page").style.display = "none";
    document.getElementById("main").style.display = "block";
    document.getElementById("button-exit").style.display = "block";
    this.showActiveUsers();
  }
  addMessage(msg) {
    if (this.model.user === "Гость") {
      alert("Для отправки сообщения нужновойти или зарегистрироваться!");
      document.getElementById("send").value = "";
      return;
    }
    let m = new Message(msg, this.model.user);
    const radioTo = document.getElementById("active-users");
    for (let i = 0; i < radioTo.length; i++) {
      if (radioTo[0].checked) {
        break;
      } else if (radioTo[i].checked) {
        console.log(radioTo[i].nextSibling.nextElementSibling.textContent);
        m.isPersonal = true;
        m.to = radioTo[i].nextSibling.nextElementSibling.textContent;
      }
    }
    if (this.model.add(m)) {
      this.messagesView.display(this.model.getPage(), this.model.user);
    }
    document.getElementById("send").value = "";
  }
  showActiveUsers() {
    this.activeUsersView.display(this.userList.activeUsers);
  }
}

function loginRegistratiion() {
  document.getElementById("login-page").style.display = "none";
  document.getElementById("registration-page").style.display = "flex";
  return false;
}
function loginGuest() {
  controller.setCurrentUser("Гость");
  return false;
}
document
  .getElementById("loginRegistratiion")
  .addEventListener("click", loginRegistratiion);
document.getElementById("loginGuest").addEventListener("click", loginGuest);
document.getElementById("loginGoogle").addEventListener("click", loginGuest);
window.controller = new Controller();

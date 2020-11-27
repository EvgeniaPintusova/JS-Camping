class Controller {
  constructor() {
    this.model = new MessageList([], "");
    this.userList = new UserList(["mama", "papa"], []);
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
    document.getElementById("login-page").style.display = "none";
    document.getElementById("main").style.display = "block";
    document.getElementById("button-exit").style.display = "block";
    this.showActiveUsers();
  }
  addMessage(msg) {
    console.log(msg);
    // if (model.add(msg)) {
    //   messagesView.display(model.getPage(), model.user);
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
document.getElementById("loginRegistratiion").addEventListener("click", loginRegistratiion);
document.getElementById("loginGuest").addEventListener("click", loginGuest);
document.getElementById("loginGoogle").addEventListener("click", loginGuest);
window.controller = new Controller();

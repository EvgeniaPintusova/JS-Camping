class Controller {
  constructor() {
    this.model = new MessageList([], "");
    this.userList = new UserList(['mama', 'papa'], []);
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
window.controller = new Controller();
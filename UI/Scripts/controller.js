console.log("hello");
class Controller {
  constructor() {
    this.model = new MessageList([], "mememe");
    this.userList = new UserList([], []);
    this.headerView = new HeaderView("nickname");
    this.messagesView = new MessagesView("messages-list");
    this.activeUsersView = new ActiveUsersView("active-users");
  }
  addMessage(form) {
    let msg = new Message(form[0].value, "I");
    if (this.model.add(msg)) {
      this.messagesView.display(this.model.getPage(), this.model.user);
    }
  }
}
window.controller = new Controller();

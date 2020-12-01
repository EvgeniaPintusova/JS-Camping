class Controller {
  constructor() {
    this.model = new MessageList(
      [
        new Message("Привет!", "Bob", true, "dad"),
        new Message("Какие дела?", "mum"),
        new Message("Всё прекрасно.", "dad"),
      ],
      ""
    );
    this.userList = new UserList();
    this.headerView = new HeaderView("nickname");
    this.messagesView = new MessagesView("messages-list");
    this.activeUsersView = new ActiveUsersView("active-users");
    this.click = 10;
  }
  userRegistration(user) {
    if (this.userList.users.indexOf(user) === -1) {
      this.userList.addUser(user);
      document.getElementById("registration-page").style.display = "none";
      document.getElementById("login-page").style.display = "flex";
    } else {
      document.getElementById("newLogin").style.border = "2px solid red";
      document.getElementById("registration-login-message").textContent =
        "Такой пользователь уже есть.";
      return;
    }
  }
  userLogin(user) {
    if (this.userList.users.indexOf(user) === -1) {
      document.getElementById("login").login.style.border = "2px solid red";
      document.getElementById("login-message").textContent =
        "Такого пользователя нет. Повторите попытку.";
      return;
    }
    this.userList.addActiveUser(user);
    this.setCurrentUser(user);
    this.click = 10;
  }
  setCurrentUser(user) {
    this.model.user = user;
    this.headerView.display(user);
    this.messagesView.display(this.model.getPage(), user);
    // this.userList.addActiveUser(user);
    document.getElementById("login-page").style.display = "none";
    document.getElementById("registration-page").style.display = "none";
    document.getElementById("main").style.display = "block";
    document.getElementById("button-exit").style.display = "block";
    this.showActiveUsers();
    let form = document.getElementById("login");
    form.login.value = "";
    form.password.value = "";
    document.getElementById("active-users")[0].checked = true;
  }
  exitButton(button) {
    button.style.display = "none";
    if (this.model.user === "Гость") {
      document.getElementById("main").style.display = "none";
      document.getElementById("registration-page").style.display = "flex";
    } else {
      document.getElementById("main").style.display = "none";
      document.getElementById("login-page").style.display = "flex";
    }
    this.headerView.display("");
  }
  addMessage(msg) {
    if (this.model.user === "Гость") {
      document.getElementById("info").textContent =
        "Для отправки сообщения нужно войти или зарегистрироваться!";
      document.getElementById("info").style.display = "block";
      setTimeout(function () {
        document.getElementById("info").style.display = "none";
      }, 5000);
      document.getElementById("send").value = "";
      return;
    }
    let m = new Message(msg, this.model.user);
    const radioTo = document.getElementById("active-users");
    for (let i = 0; i < radioTo.length; i++) {
      if (radioTo[0].checked) {
        break;
      } else if (radioTo[i].checked) {
        m.isPersonal = true;
        m.to = radioTo[i].nextSibling.nextElementSibling.textContent;
      }
    }
    if (this.model.add(m)) {
      console.log(m);
      this.messagesView.display(this.model.getPage(), this.model.user);
    }
    document.getElementById("send").value = "";
    radioTo[0].checked = true;
  }
  // removeMessage(id) {
  //   if (model.remove(id)) {
  //     messagesView.display(model.getPage(), model.user);
  //   }
  // }
  showActiveUsers() {
    this.activeUsersView.display(this.userList.activeUsers, this.model.user);
  }
  findText(form) {
    const find = form.search.value;
    this.messagesView.display(
      this.model.getPage(0, 10, { text: find, author: find }),
      this.model.user
    );
  }
  filterMessages(form) {
    this.messagesView.display(
      this.model.getPage(0, 10, {
        author: form.name.value,
        text: form.mess.value,
        dateTo: form.date1.value,
        dateFrom: form.date2.value,
      }),
      this.model.user
    );
    document.getElementById("box").style.display = "none";
    document.getElementById("box2").style.display = "flex";
  }
  defaultFilter() {
    let form = document.getElementById("filters");
    form.name.value = "";
    form.mess.value = "";
    form.date1.value = "";
    form.date2.value = "";
    this.messagesView.display(this.model.getPage(), this.model.user);
    document.getElementById("box2").style.display = "none";
  }
  pagination(button) {
    this.click += 10;
    this.messagesView.display(
      this.model.getPage(0, this.click),
      this.model.user
    );
    // условие для блокировки кнопки???
    if (this.click >= this.model._messages.length) {
      document.getElementById("info").textContent = "Все сообщения отображены";
      document.getElementById("info").style.display = "block";
      setTimeout(function () {
        document.getElementById("info").style.display = "none";
      }, 3000);
    }
  }
}
document
  .getElementById("messages-list")
  .addEventListener("click", function (event) {
    if (event.target.id === "delete") {
      alert("delete");
    }
    if (event.target.id === "rewrite") {
      alert("rewrite");
    }
  });

function loginRegistratiion() {
  document.getElementById("login-page").style.display = "none";
  document.getElementById("registration-page").style.display = "flex";
  return false;
}
function loginGuest() {
  controller.setCurrentUser("Гость");
  return false;
}

function registrEntry() {
  document.getElementById("registration-page").style.display = "none";
  document.getElementById("login-page").style.display = "flex";
  return false;
}
function registrGuest() {
  controller.setCurrentUser("Гость");
  return false;
}

document
  .getElementById("loginRegistratiion")
  .addEventListener("click", loginRegistratiion);
document.getElementById("loginGuest").addEventListener("click", loginGuest);
document.getElementById("loginGoogle").addEventListener("click", loginGuest);

document.getElementById("registrEntry").addEventListener("click", registrEntry);
document.getElementById("registrGuest").addEventListener("click", registrGuest);
document
  .getElementById("registrGoogle")
  .addEventListener("click", registrGuest);

window.controller = new Controller();

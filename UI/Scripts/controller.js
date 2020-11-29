class Controller {
  constructor() {
    this.model = new MessageList(
      [
        new Message("Привет!", "Bob", true, "dad"),
        new Message("Какие дела?", "mum"),
        new Message("Всё прекрасно.", "dad"),
        new Message("Надо машину помыть", "mum", true, "Bob"),
        new Message("Какие планы", "dad", true, "mum"),
        new Message("Всем привет!", "Bob"),
        new Message("Снег идёт, холодно.", "mum"),
        new Message("Катаюсь на коньках.", "Mary"),
        new Message("Иду в магазин, там встетимся", "mum", true, "Bob"),
        new Message("Какие планы", "Janni", true, "mum"),
      ],
      ""
    );
    this.userList = new UserList(
      ["mum", "dad", "Janni", "Bob", "Mary"],
      ["Гость", "mum", "dad", "Janni", "Bob", "Mary", "Jon", "Red"]
    );
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
    this.setCurrentUser(user);
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
      this.messagesView.display(this.model.getPage(), this.model.user);
    }
    document.getElementById("send").value = "";
  }
  showActiveUsers() {
    this.activeUsersView.display(this.userList.activeUsers, this.model.user);
  }
  // editMessage(id, msg) {
  //   if (this.model.edit(id, msg)) {
  //     this.messagesView.display(this.model.getPage(), this.model.user);
  //   }
  // }
  findText(form) {
    const find = form.search.value;
    this.messagesView.display(
      this.model.getPage(0, 10, { text: find }),
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

class Controller {
  constructor() {
    this.model = new MessageList("");
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
    document.getElementById("nickname-flex").style.display = "block";
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
    document.getElementById("nickname-flex").style.display = "none";
    this.headerView.display("");
  }
  addMessage(msg) {
    console.log(msg);
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
    let m = new Message(`${+new Date()}`, new Date(), msg, this.model.user);
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
      // let len = this.model.messages.length % 10;
      this.messagesView.display(this.model.getPage(), this.model.user);
      this.click = 10;
    }
    document.getElementById("send").value = "";
    radioTo[0].checked = true;
  }
  showActiveUsers() {
    this.activeUsersView.display(this.userList.activeUsers, this.model.user);
  }
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
  pagination() {
    this.click += 10;
    this.messagesView.display(
      this.model.getPage(0, this.click),
      this.model.user
    );
    //  условие для блокировки кнопки???
    if (this.click >= this.model._messages.length) {
      document.getElementById("info").textContent = "Все сообщения отображены";
      document.getElementById("info").style.display = "block";
      setTimeout(function () {
        document.getElementById("info").style.display = "none";
      }, 3000);
    }
  }
  removeMessage(id) {
    if (this.model.remove(id)) {
      this.messagesView.display(this.model.getPage(), this.model.user);
    }
  }
  editMessage(value, el) {
    console.log(el);
    document.getElementById("editmsg").style.display = "block";
    document.getElementById("addmsg").style.display = "none";
    console.log(el);
    const activeUsers = document.getElementById("activeUsers");
    document.getElementById("edit").value = el.querySelector(
      ".message-text"
    ).textContent;
    // if (el.querySelector(".to").textContent !== "") {
    //   for (const item of activeUsers) {
    //     if (item === el.querySelector(".to").textContent) {
    //       console.log(el.querySelector(".to").textContent);
    //     }
    //   }
    // }
    // if (this.model.edit(id, msg)) {
    //   messagesView.display(model.getPage(), model.user);
    // }
  }
}
//делегирование на редактирование Сообщений в списке
document
  .getElementById("messages-list")
  .addEventListener("click", function (event) {
    if (event.target.id === "delete") {
      alert("delete");
      const id = document.getElementById("delete").parentNode.parentNode.id;
      controller.removeMessage(id);
    }
    if (event.target.id === "rewrite") {
      alert("rewrite");
      console.log(document.getElementById("rewrite").parentNode.parentNode);
      const id = document.getElementById("rewrite").parentNode.parentNode.id;
      controller.editMessage(document.getElementById(id));
    }
  });
//список пользователей в мобилке
document
  .getElementById("nickname-button")
  .addEventListener("click", function () {
    element = document.getElementById("listing");
    display = element.style.display;
    let w = document.documentElement.clientWidth;
    if (w <= 450) {
      if (display === "none" || !display) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    } else {
      element.style.display = "block";
    }
  });
//переход с Логина на Регистрацию
function loginRegistratiion() {
  document.getElementById("login-page").style.display = "none";
  document.getElementById("registration-page").style.display = "flex";
  return false;
}
//вход с Логина Гостем
function loginGuest() {
  controller.setCurrentUser("Гость");
  return false;
}
//переход с Регистрации на Логин
function registrEntry() {
  document.getElementById("registration-page").style.display = "none";
  document.getElementById("login-page").style.display = "flex";
  document.getElementById("nickname-flex").style.display = "none";
  return false;
}
//вход с Регистрации Гостем
function registrGuest() {
  controller.setCurrentUser("Гость");
  return false;
}
//открытие фильтров
function openbox(id) {
  display = document.getElementById(id).style.display;
  if (display === "none" || !display) {
    document.getElementById(id).style.display = "block";
    document.getElementById("flex-container-2").style.overflow = "hidden";
  } else {
    document.getElementById(id).style.display = "none";
    document.getElementById("flex-container-2").style.overflow = "auto";
  }
}
//действия со входом/выходом
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

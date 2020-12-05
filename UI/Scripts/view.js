class UserList {
  constructor() {
    this._users = JSON.parse(localStorage.getItem("userList"));
    this._activeUsers = JSON.parse(localStorage.getItem("activeUserList"));
  }
  get activeUsers() {
    return this._activeUsers;
  }
  get users() {
    return this._users;
  }
  addActiveUser(user) {
    this._activeUsers.push(user);
    // this.save();
  }
  addUser(user) {
    this._users.push(user);
    this.save();
  }
  save() {
    localStorage.setItem("userList", JSON.stringify(this._users));
    // localStorage.setItem("activeUserList", JSON.stringify(this._activeUsers));
  }
}
class HeaderView {
  constructor(containerId) {
    this._headerElement = document.getElementById(containerId);
  }

  display(userName = "Гость") {
    this._headerElement.textContent = userName;
  }
}
class MessagesView {
  constructor(containerId) {
    this._messagesList = document.getElementById(containerId);
  }

  display(msgList, currUser) {
    this._messagesList.innerHTML = "";
    const msgTpl = document.getElementById("msg-template");
    const msgTplmine = document.getElementById("msg-template-mine");
    const fragment = new DocumentFragment();
    let el;
    for (const item of msgList) {
      if (item.author === currUser) {
        el = msgTplmine.content.cloneNode(true);
        el.querySelector(".own-mess").setAttribute("id", item.id);
        el.querySelector(".author").textContent = item.author;
        el.querySelector(".message-text").textContent = item.text;
        el.querySelector(
          ".time"
        ).textContent = item.createdAt.toLocaleTimeString().slice(0, -3);
        el.querySelector(
          ".date"
        ).textContent = item.createdAt.toLocaleDateString();
        if (item.isPersonal) {
          el.querySelector(".owner").textContent = "Личное сообщение";
          el.querySelector(".to").textContent = `для ${item.to}`;
        }
      } else {
        el = msgTpl.content.cloneNode(true);
        el.querySelector(".own-mess").setAttribute("id", item.id);
        el.querySelector(".author").textContent = item.author;
        el.querySelector(".message-text").textContent = item.text;
        el.querySelector(
          ".time"
        ).textContent = item.createdAt.toLocaleTimeString().slice(0, -3);
        el.querySelector(
          ".date"
        ).textContent = item.createdAt.toLocaleDateString();
        if (item.to === currUser) {
          el.querySelector(".owner").textContent = "Личное сообщение";
        }
      }
      fragment.appendChild(el);
    }
    this._messagesList.appendChild(fragment);
  }
}

class ActiveUsersView {
  constructor(containerId) {
    this._activeUsersView = document.getElementById(containerId);
  }

  display(activeUsers, user) {
    this._activeUsersView.innerHTML = "";
    let index = 0;
    const tpl = document.getElementById("user-template");
    const fragment = new DocumentFragment();
    const defUser = tpl.content.cloneNode(true);
    defUser.querySelector(".user-name").textContent = "none";
    fragment.appendChild(defUser);
    for (const item of activeUsers) {
      if (item === user) {
        continue;
      }
      const el = tpl.content.cloneNode(true);
      el.querySelector(".user-name").textContent = item;
      el.querySelector(".input-user").setAttribute("id", ++index);
      fragment.appendChild(el);
    }
    this._activeUsersView.appendChild(fragment);
  }
}

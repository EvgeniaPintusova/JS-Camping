class UserList {
  constructor(activeUsers = [], users = []) {
    this._activeUsers = activeUsers;
    this._users = users;
  }
  get activeUsers() {
    return this._activeUsers;
  }
  get users() {
    return this._users;
  }
  addUser(user){
    this._users.push(user);
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
// const b = new HeaderView("nickname");
// b.display('Zhenya');

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
// const c = new MessagesView('messages-list');
// c.display(arrMessages, "Zhenya");

class ActiveUsersView {
  constructor(containerId) {
    this._activeUsersView = document.getElementById(containerId);
  }

  display(activeUsers) {
    let index = 0;
    const tpl = document.getElementById("user-template");
    const fragment = new DocumentFragment();
    for (const item of activeUsers) {
      const el = tpl.content.cloneNode(true);
      el.querySelector(".user-name").textContent = item;
      el.querySelector(".input-user").setAttribute("id", ++index);
      fragment.appendChild(el);
    }
    this._activeUsersView.appendChild(fragment);
  }
}
// const d = new ActiveUsersView('active-users');
// d.display(a.activeUsers);

// const model = new MessageList(arrMessages, "");
// console.log(model);
// const headerView = new HeaderView("nickname");
// const messagesView = new MessagesView("messages-list");
// const activeUsersView = new ActiveUsersView("active-users");
// const users = new UserList(
//   ["mum", "dad", "sis", "bro"],
//   ["mum", "dad", "sis", "bro", "cat", "dog", "gra"]
// );

// function setCurrentUser(user) {
//   model.user = user;
//   headerView.display(user);
//   messagesView.display(model.getPage(), user);
// }
//setCurrentUser("mum");

// function addMessage(msg) {
//   if (model.add(msg)) {
//     messagesView.display(model.getPage(), model.user);
//   }
// }
// const m = new Message("Приехали?", "mum", true, "Zhenya");
// const m1 = new Message("всё ок", "mum");
// addMessage(m);
// addMessage(m1);

// function showActiveUsers() {
//   activeUsersView.display(users.activeUsers);
// }
// showActiveUsers();

// function editMessage(id, msg) {
//   if (model.edit(id, msg)) {
//     messagesView.display(model.getPage(), model.user);
//   }
// }
// editMessage("3", { text: "lili", to: "dad" });

// function removeMessage(id) {
//   if (model.remove(id)) {
//     messagesView.display(model.getPage(), model.user);
//   }
// }
// removeMessage("2");

// function showMessages(skip = 0, top = 10, filterConfig = {}) {
//   messagesView.display(model.getPage(skip, top, filterConfig), model.user);
// }
// showMessages(0, 1, { text: 'h' });

class UserList {
  constructor(activeUsers = [], users = []) {
    this._activeUsers = [activeUsers];
    this._users = [users];
  }

  get activeUsers() {
    return this._activeUsers;
  }

  get users() {
    return this._users;
  }
}
const a = new UserList(['mum', 'dad', 'sis'], ['mum', 'dad', 'sis', 'granny']);

class HeaderView {
  constructor(containerId) { // nickname
    this._headerElement = document.getElementById(containerId);
  }

  display(params = 'Гость') {
    this._headerElement.textContent = params;
  }
}
const b = new HeaderView('nickname');
b.display('Zenya');

class MessagesView {
  constructor(containerId) { // messages-list
    this._messagesList = document.getElementById(containerId);
  }

  display(msgList) {
    const msgTpl = document.getElementById('msg-template');
    const fragment = new DocumentFragment();
    for (const item of msgList) {
      const el = msgTpl.content.cloneNode(true);
      el.querySelector('.author').textContent = item.author;
      el.querySelector('.message-text').textContent = item.text;
      el.querySelector('.time').textContent = item.createdAt.toLocaleTimeString().slice(0, -3);
      el.querySelector('.date').textContent = item.createdAt.toLocaleDateString();
      fragment.appendChild(el);
    }
    this._messagesList.appendChild(fragment);
  }
}
const c = new MessagesView('messages-list');
c.display(arrMessages);



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
}
// const a = new UserList(['mum', 'dad', 'sis'], ['mum', 'dad', 'sis', 'granny']);

class HeaderView {
  constructor(containerId) {
    this._headerElement = document.getElementById(containerId);
  }

  display(params = 'Гость') {
    this._headerElement.textContent = params;
  }
}
// const b = new HeaderView("nickname");
// b.display(currentUser.name);

class MessagesView {
  constructor(containerId) {
    this._messagesList = document.getElementById(containerId);
  }

  display(msgList, currUser) {
    const msgTpl = document.getElementById('msg-template');
    const msgTplmine = document.getElementById('msg-template-mine');
    const fragment = new DocumentFragment();
    let el;
    for (const item of msgList) {
      if (item.author === currUser) {
        el = msgTplmine.content.cloneNode(true);
        el.querySelector('.author').textContent = item.author;
        el.querySelector('.message-text').textContent = item.text;
        el.querySelector('.time').textContent = item.createdAt.toLocaleTimeString().slice(0, -3);
        el.querySelector('.date').textContent = item.createdAt.toLocaleDateString();
        if (item.isPersonal) {
          el.querySelector('.owner').textContent = 'Личное сообщение';
          el.querySelector('.to').textContent = `для ${item.to}`;
        }
      } else {
        el = msgTpl.content.cloneNode(true);
        el.querySelector('.author').textContent = item.author;
        el.querySelector('.message-text').textContent = item.text;
        el.querySelector('.time').textContent = item.createdAt.toLocaleTimeString().slice(0, -3);
        el.querySelector('.date').textContent = item.createdAt.toLocaleDateString();
        if (item.to === currentUser.name) {
          el.querySelector('.owner').textContent = 'Личное сообщение';
        }
      }
      fragment.appendChild(el);
    }
    this._messagesList.appendChild(fragment);
  }
}
// const c = new MessagesView('messages-list');
// c.display(arrMessages, "ecoFriend");

class ActiveUsersView {
  constructor(containerId) {
    this._activeUsersView = document.getElementById(containerId);
  }

  display(activeUsers) {
    let index = 0;
    const tpl = document.getElementById('user-template');
    const fragment = new DocumentFragment();
    for (const item of activeUsers) {
      const el = tpl.content.cloneNode(true);
      el.querySelector('.user-name').textContent = item;
      el.querySelector('.input-user').setAttribute('id', ++index);
      fragment.appendChild(el);
    }
    this._activeUsersView.appendChild(fragment);
  }
}
// const d = new ActiveUsersView();
// d.display(a.activeUsers);

const model = new MessageList();
const headerView = new HeaderView('nickname');
const messagesView = new MessagesView('messages-list');
const activeUsersView = new ActiveUsersView('active-users');
const activeUsers = ['mum', 'dad', 'sis', 'bro', 'cat'];

function setCurrentUser(user) {
  currentUser = user;
  model.user = user;
  model.author = user;
  headerView.display(user);
}
setCurrentUser('Zhenya');

function addMessage(msg) {
  if (model.add(msg)) {
    messagesView.display(model.getPage(), model.author);
  }
}
const m = new Message('Какие дела?', false);
const m1 = new Message('Что делаешь?', true, 'mum');
const m2 = new Message('Привет)');
addMessage(m);
addMessage(m1);
// addMessage(m2);

function showActiveUsers() {
  activeUsersView.display(activeUsers);
}
showActiveUsers();

function editMessage(id, msg) {
  if (model.edit(id, msg)) {
    messagesView.display(model.getPage(), model.author);
  }
}
editMessage('10', { text: 'lili' });

function removeMessage(id) {
  if (model.remove(id)) {
    messagesView.display(model.getPage(), model.author);
  }
}
removeMessage('10');

function showMessages(skip = 0, top = 10, filterConfig = {}) {
  messagesView.display(model.getPage(skip, top, filterConfig), model.author);
}
showMessages(0, 1, { text: '?' });

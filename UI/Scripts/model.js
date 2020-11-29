const TEXT_LEN = 200;
let COUNT = 0; // переменная для установления Id для тестов
class Message {
  constructor(text, author, isPersonal = false, to = "") {
    this._id = `${+new Date()}`;
    // this._id = COUNT.toString();
    // COUNT++; // для тестов
    this.text = text;
    this._createdAt = new Date();
    this.author = author;
    this.isPersonal = isPersonal;
    this.to = to;
  }

  set text(value) {
    if (value.length < TEXT_LEN) {
      this._text = value;
    } else {
      this._text = value.slice(0, TEXT_LEN);
    }
  }

  set author(value) {
    this._author = value;
  }

  set isPersonal(value) {
    this._isPersonal = value;
  }

  set to(value) {
    this._to = value;
    if (this._to) {
      this._isPersonal = true;
    } else {
      this._isPersonal = false;
    }
  }

  get id() {
    return this._id;
  }

  get text() {
    return this._text;
  }

  get createdAt() {
    return this._createdAt;
  }

  get author() {
    return this._author;
  }

  get isPersonal() {
    return this._isPersonal;
  }

  get to() {
    return this._to;
  }
}

class MessageList {
  constructor(msgList, user) {
    this.messages = msgList;
    this.user = user;
  }

  set messages(value) {
    this._messages = value;
  }

  get messages() {
    return this._messages;
  }

  set user(value) {
    this._user = value;
  }

  get user() {
    return this._user;
  }

  isAuthor(msg) {
    return msg.author === this.user;
  }

  addAll(arrMsgs) {
    const arrNoValidate = [];
    for (let i = 0; i < arrMsgs.length; i++) {
      if (MessageList.validate(arrMsgs[i])) {
        this._messages.push(arrMsgs[i]);
      } else {
        arrNoValidate.push(arrMsgs[i]);
      }
    }
    return arrNoValidate;
  }

  clear() {
    this._messages.splice(0);
  }

  getPage(skip = 0, top = 10, filterConfig = {}) {
    if (skip < 0 || top < 0) {
      return false;
    }
    const filterObj = {
      author: (item, author) =>
        !author || item.author.toLowerCase().includes(author.toLowerCase()),
      text: (item, text) =>
        !text || item.text.toLowerCase().includes(text.toLowerCase()),
      dateFrom: (item, dateFrom) => !dateFrom || item.dateFrom > dateFrom,
      dateTo: (item, dateTo) => !dateTo || item.dateTo < dateTo,
    };
    let arr = [];
    for (let i = 0; i < this.messages.length; i++) {
      if (
        this._messages[i].author === this.user ||
        this._messages[i].to === this.user ||
        this._messages[i]._isPersonal === false
      ) {
        arr.push(this._messages[i]);
      }
    }
    Object.keys(filterConfig).forEach((key) => {
      arr = arr.filter((item) => filterObj[key](item, filterConfig[key]));
    });
    arr.sort((a, b) => a.createdAt - b.createdAt);
    arr = arr.slice(skip, skip + top);
    return arr;
  }

  get(id) {
    const result = this._messages.find((msg) => msg.id === id);
    return result;
  }

  add(msg) {
    if (this.isAuthor(msg)) {
      const size = this._messages.length;
      if (MessageList.validate(msg)) {
        this._messages.push(msg);
      } else {
        return false;
      }
      if (size < this._messages.length) {
        return true;
      }
      return false;
    }
    return false;
  }

  edit(id, msg) {
    let m = new Message(msg.text, this.get(id).author, msg.isPersonal, msg.to);
    if (MessageList.validate(m)) {
      if (this.isAuthor(this.get(id))) {
        m = this.get(id);
        for (const key in msg) {
          if (key === "text") {
            m.text = msg[key];
          } else if (key === "isPersonal") {
            m.isPersonal = msg[key];
          } else if (key === "to") {
            m.to = msg[key];
            m.isPersonal = true;
          } else {
            return false;
          }
        }
        return true;
      }
      return false;
    }
    return false;
  }

  remove(id) {
    if (this.isAuthor(this.get(id))) {
      const index = this._messages.findIndex((msg) => msg.id === id);
      const size = this._messages.length;
      if (index > -1) {
        this._messages.splice(index, 1);
      }
      if (size > this._messages.length) {
        return true;
      }
      return false;
    }
    return false;
  }

  static validate(msg) {
    const validateObj = {
      id: (item) => item.id && typeof item.id === "string",
      text: (item) =>
        item.text &&
        typeof item.text === "string" &&
        item.text.length <= TEXT_LEN,
      author: (item) => item.author && typeof item.author === "string",
      createdAt: (item) => item.createdAt && typeof item.createdAt === "object",
      isPersonal: (item) => {
        if (
          (item.isPersonal === false && !item.to) ||
          (item.isPersonal && item.to && typeof item.to === "string")
        ) {
          return typeof item.isPersonal === "boolean";
        }
      },
    };
    return Object.keys(validateObj).every((key) => validateObj[key](msg));
  }
}

// const arrMessages = [
//   new Message("Привет!", "Zhenya", true, "dad"),
//   new Message("Какие дела?", "mum"),
//   new Message(
//     "Давно выяснено, что при оценке дизайна и композиции" +
//       "читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому," +
//       "что тот обеспечивает более или менее стандартное заполнение шаблона",
//     "mum"
//   ),
//   new Message(
//     "А также реальное распределение букв и пробелов в абзацах," +
//       "которое не получается при простой дубликации",
//     "mum",
//     true,
//     "Zhenya"
//   ),
//   new Message(
//     "Многие программы электронной вёрстки и редакторы HTML" +
//       "используют Lorem Ipsum в качестве текста по умолчанию," +
//       'так что поиск по ключевым словам "lorem ipsum" сразу показывает, ' +
//       "как много веб-страниц всё ещё дожидаются своего настоящего рождения.",
//     "dady",
//     true,
//     "mum"
//   ),
// ];
// const list = new MessageList([], "Zhenya");
// const invalidList = list.addAll(arrMessages);
// console.log(list);
// console.log(invalidList);
// console.log(list.isAuthor(arrMessages[1]));
// console.log(list.isAuthor(arrMessages[4]));
// console.log(list.remove('3'));
// console.log(list.remove('4'));
// console.log(list.getPage());
// const message = new Message ("Hi! How are u?", 'Zhenya');
// list.add(message);
// console.log(list);
// console.log(list.edit('5', {text: 'you'}));
// console.log(list);
// list.clear();
// console.log(list);

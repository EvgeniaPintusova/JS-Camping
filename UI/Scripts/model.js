const TEXT_LEN = 200;
class Message {
  constructor(
    id = `${+new Date()}`,
    createdAt = new Date(),
    text = "",
    author,
    isPersonal = false,
    to = ""
  ) {
    this.id = id;
    this.text = text;
    this.createdAt = createdAt;
    this.author = author;
    this.isPersonal = isPersonal;
    this.to = to;
  }
  set id(value) {
    this._id = value;
  }
  set text(value) {
    if (value.length < TEXT_LEN) {
      this._text = value;
    } else {
      this._text = value.slice(0, TEXT_LEN);
    }
  }
  set createdAt(value) {
    this._createdAt = value;
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
  constructor(user) {
    this.messages = JSON.parse(localStorage.getItem("messageList"));
    this.user = user;
  }

  save() {
    localStorage.setItem("messageList", JSON.stringify(this._messages));
  }

  set messages(value) {
    this._messages = [];
    for (let i = 0; i < value.length; i++) {
      const msg = new Message(
        value[i]._id,
        value[i]._date,
        value[i]._text,
        value[i]._author,
        value[i]._isPersonal,
        value[i]._to
      );
      this._messages.push(msg);
    }
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
    this.save();
    return arrNoValidate;
  }

  clear() {
    this._messages.splice(0);
    this.save();
  }

  getPage(skip = 0, top = 10, filterConfig = {}) {
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
        this.save();
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
        this.save();
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
        this.save();
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

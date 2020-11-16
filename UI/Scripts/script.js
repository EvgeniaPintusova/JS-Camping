const currentUser = { name: 'ecoFriend' };
const TEXT_LEN = 200;
let COUNT = 0; // переменная для установления Id для тестов
class Message {
  constructor(text, isPersonal = false, to = '') {
    // this._id = `${+new Date()}`;
    this._id = COUNT.toString(); COUNT++; // для тестов
    this.text = text;
    this._createdAt = new Date();
    this._author = currentUser.name;
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
  constructor() {
    this._messages = [];
    this.user = currentUser.name;
    // this.user = 'me'; //для тестов
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
    return msg.author === this._user;
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
    if (skip < 0 || top < 0) { return false; }
    const filterObj = {
      author: (item, author) => !author || item.author.toLowerCase().includes(author.toLowerCase()),
      text: (item, text) => !text || item.text.toLowerCase().includes(text.toLowerCase()),
      dateFrom: (item, dateFrom) => !dateFrom || item.dateFrom > dateFrom,
      dateTo: (item, dateTo) => !dateTo || item.dateTo < dateTo,
    };
    let arr = [];
    for (let i = 0; i < this._messages.length; i++) {
      if (this._messages[i].author === this.user
               || this._messages[i].to === this.user
                  || this._messages[i]._isPersonal === false) {
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
      console.log(this.isAuthor(msg));
      const size = this._messages.length;
      if (MessageList.validate(msg)) {
        this._messages.push(msg);
      } else { return false; }
      if (size < this._messages.length) { return true; }
      return false;
    }
    return false;
  }

  edit(id, msg) {
    let m = new Message(msg.text, msg.isPersonal, msg.to);
    if (MessageList.validate(m)) {
      if (this.isAuthor(this.get(id))) {
        m = this.get(id);
        for (const key in msg) {
          if (key === 'text') {
            m.text = msg[key];
          } else if (key === 'isPersonal') {
            m.isPersonal = msg[key];
          } else if (key === 'to') {
            m.to = msg[key];
            m.isPersonal = true;
          } else { return false; }
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
      if (size > this._messages.length) { return true; }
      return false;
    }
    return false;
  }

  static validate(msg) {
    const validateObj = {
      id: (item) => item.id && typeof item.id === 'string',
      text: (item) => item.text && typeof item.text === 'string' && item.text.length <= TEXT_LEN,
      author: (item) => item.author && typeof item.author === 'string',
      createdAt: (item) => item.createdAt && typeof item.createdAt === 'object',
      isPersonal: (item) => {
        if ((item.isPersonal === false && !item.to)
               || (item.isPersonal && item.to && typeof item.to === 'string')) {
          return typeof item.isPersonal === 'boolean';
        }
      },
    };
    return Object.keys(validateObj).every((key) => validateObj[key](msg));
  }
}

const arrMessages = [
  new Message('Привет!', true, 'my_word'),
  new Message('Какие дела?', false),
  new Message(
    'Давно выяснено, что при оценке дизайна и композиции'
           + 'читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому,'
           + 'что тот обеспечивает более или менее стандартное заполнение шаблона',
  ),
  new Message(
    'А также реальное распределение букв и пробелов в абзацах,'
           + 'которое не получается при простой дубликации',
  ),
  new Message(
    'Многие программы электронной вёрстки и редакторы HTML'
           + 'используют Lorem Ipsum в качестве текста по умолчанию,'
           + 'так что поиск по ключевым словам "lorem ipsum" сразу показывает, '
           + 'как много веб-страниц всё ещё дожидаются своего настоящего рождения.',
    true,
    'ecoFriend',
  ),
  new Message('За прошедшие годы текст Lorem Ipsum получил много версий.'),
  new Message(
    'Многие думают, что Lorem Ipsum - взятый с потолка'
           + 'псевдо-латинский набор слов, но это не совсем так.'
           + 'Его корни уходят в один фрагмент классической латыни 45 года н.э., '
           + 'то есть более двух тысячелетий назад.',
  ),
  new Message(
    'Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney,'
           + 'штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur",'
           + 'и занялся его поисками в классической латинской литературе.',
    true,
    'NotPlastic',
  ),
  new Message(
    'В результате он нашёл неоспоримый первоисточник Lorem Ipsum '
           + 'в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum"'
           + ' ("О пределах добра и зла"), написанной Цицероном в 45 году н.э.',
    true,
    'NotPlastic',
  ),
  new Message(
    'Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", '
      + 'происходит от одной из строк в разделе 1.10.32.',
  ),
];
const list = new MessageList();
const invalidList = list.addAll(arrMessages);
const m1 = new Message('Привет!', true, 'my_word');
const m2 = new Message('Давно выяснено, что при оценке дизайна и композиции'
         + 'читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому,'
         + 'читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому,'
         + 'читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому'
         + 'что тот обеспечивает более или менее стандартное заполнение шаблона!', true, 'my_word');
const m3 = new Message('А также реальное распределение букв и пробелов в абзацах,'
         + 'которое не получается при простой дубликации', false);
const m4 = new Message('А также реальное распределение букв и пробелов в абзацах,'
         + 'которое не получается при простой дубликации', true, 'mum');

console.log(list.messages);

// addAll()
const messages2 = [
  new Message('П', true, 'my_word'),
  new Message('Какие дела?', false),
  new Message('Давно выяснено, что при оценке дизайна и композиции'),
];
const inValid = list.addAll(messages2);
console.log(inValid);
console.log(list.messages);

// MessageList.validate()
console.log(MessageList.validate(m3));// true

// get()
console.log(list.get('5'));

// getPage()
console.log(list.getPage(0, 10, { text: 'многие' }));
console.log(list.getPage(0, 10)); // для проверки изменить строки 58, 59

// add
console.log(list.add(m4));// true
console.log(list.messages);// добавился эл-т

// edit()
console.log(list.get('4'));
console.log(list.edit('4', { text: 'Hello word', to: 'mum' })); // true
console.log(list.edit('4', { author: 'Hello word', text: 'Hello word' })); // false
console.log(list.get('4'));

// remove()
console.log(list.remove('6')); // true
console.log(list.messages);

// clear()
console.log(list.messages);
list.clear();
console.log(list.messages);

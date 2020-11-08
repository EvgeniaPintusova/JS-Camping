const user = {name: 'ecoFriend'};
const TEXT_LEN = 200;
let COUNT = 0;
const filterObj = {
   author: (item, author) => !author || item.author.toLowerCase().includes(author.toLowerCase()),
   text: (item, text) => !text || item.text.toLowerCase().includes(text.toLowerCase()),
   dateFrom:  (item, dateFrom) => !dateFrom || item.dateFrom > dateFrom,
   dateTo:  (item, dateTo) => !dateTo || item.dateTo < dateTo,
};
const validateObj = {
   id: (item) => item.id && typeof item.id === "string",
   text: (item) => item.text && typeof item.text === "string" && item.text.length<200,
   author: (item) => item.author && typeof item.author === "string",
   createdAt: (item) => item.createdAt && typeof item.createdAt === "object",
   isPersonal: (item) => {
      if((item.isPersonal === false && !item.to) || 
         (item.isPersonal && item.to && typeof item.to === "string")){
            return typeof item.isPersonal === "boolean";
      }
   }
}
class Message{
   constructor(text, isPersonal=false, to){
      // this._id = `${+new Date()}`;
      this._id = COUNT.toString(); COUNT++;
      this.text = text;
      this._createdAt = new Date();
      this._author = user.name;
      this.isPersonal = isPersonal;
      this.to = to;
   }
   set text(value) {
      // console.log('setText');
      if (value.length < TEXT_LEN) {
        this._text = value;
      }
      else {
         this._text = value.slice(0, TEXT_LEN);
      }
   }
   set isPersonal(value) {
      // console.log('setIsPersonal');
      this._isPersonal = value;
   }
   set to(value) {
      // console.log('setTo');
      this._to = value;
   }
   get id(){
      // console.log('getId');
      return this._id;
   }
   get text(){
      // console.log('getText');
      return this._text;
   }
   get createdAt(){
      // console.log('getCreatedAt');
      return this._createdAt;
   }
   get author(){
      // console.log('getAuthor');
      return this._author;
   }
   get isPersonal(){
      // console.log('getIsPersonal');
      return this._isPersonal;
   }
   get to(){
      // console.log('getTo');
      return this._to;
   }
}

class MessageList{
   constructor(){
      this._messages = [
         new Message('Привет!',true,'my_word'),
         new Message('Какие дела?',false),
         new Message(
            'Давно выяснено, что при оценке дизайна и композиции' + 
                 'читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому,'+ 
                 'что тот обеспечивает более или менее стандартное заполнение шаблона',
         ),
         new Message(
             'А также реальное распределение букв и пробелов в абзацах,'+
                 'которое не получается при простой дубликации',
         ),
         new Message(
             'Многие программы электронной вёрстки и редакторы HTML'+
                 'используют Lorem Ipsum в качестве текста по умолчанию,'+
                 'так что поиск по ключевым словам "lorem ipsum" сразу показывает, '+
                 'как много веб-страниц всё ещё дожидаются своего настоящего рождения.',
             true,
             'ecoFriend'
         ),
         new Message('За прошедшие годы текст Lorem Ipsum получил много версий.'),
         new Message(
             'Многие думают, что Lorem Ipsum - взятый с потолка'+
                 'псевдо-латинский набор слов, но это не совсем так.'+ 
                 'Его корни уходят в один фрагмент классической латыни 45 года н.э., '+
                 'то есть более двух тысячелетий назад.',
          ),
          new Message(
            'Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney,'+
                 'штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur",'+
                 'и занялся его поисками в классической латинской литературе.',
            true,
            'NotPlastic'
          ),
          new Message(
            'В результате он нашёл неоспоримый первоисточник Lorem Ipsum '+
                 'в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum"'+
                 ' ("О пределах добра и зла"), написанной Цицероном в 45 году н.э.',
            true,
            'NotPlastic'
          ),
          new Message(
            'Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", '+
            'происходит от одной из строк в разделе 1.10.32.',
          )
      ]
   }
   get messages(){
      return this._messages;
   }
   getPage(skip = 0, top = 10, filterConfig = {}) {
      if (skip<0 || top<0){ return false; }
      let arr = this._messages.slice();
      Object.keys(filterConfig).forEach(key => {
         arr = arr.filter(item => filterObj[key](item, filterConfig[key]));
      });
      arr.sort((a,b)=>{
         return a.createdAt-b.createdAt;
      })
      arr = arr.slice(skip, skip+top);
      return arr;
   }
   get(id){
      const result = this._messages.find(msg => msg.id === id);
      return  result;
   }
   add(msg){
      let size = this._messages.length;
      if(MessageList.validate(msg)){
         this._messages.push(msg);
      }
      if (size<this._messages.length){return true;}
      else {return false;}
   }
   edit(id, msg){
      // let m = this._messages.get(id); ?? не работает(
      let m = this._messages.find(msg => msg.id === id);
      for (const key in msg){
         console.log(key);
         if (key === 'text') { 
            m.text = msg[key];
         }
         else if (key === 'isPersonal') {
            m.isPersonal = msg[key];
         }
         else if (key === 'to') {
            m.to = msg[key];
            m.isPersonal = true;
         }
         else { return false; }
      }
      if (MessageList.validate(m)){return true;}
      else {return false; }
   }
   remove(id){
      let index = this._messages.findIndex( msg => msg.id === id );
      let size = this._messages.length;
      if (index >-1){
         this._messages.splice(index, 1);
      }
      if (size>this._messages.length){return true;}
      else {return false;}
   }
   static validate(msg){
      return Object.keys(validateObj).every((key) => validateObj[key](msg));
   }
}


let m1 = new Message('Привет!', true,'my_word');
let m2 = new Message('Давно выяснено, что при оценке дизайна и композиции' + 
'читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому,'+ 
'что тот обеспечивает более или менее стандартное заполнение шаблона!', true,'my_word');
let m3 = new Message('А также реальное распределение букв и пробелов в абзацах,'+
'которое не получается при простой дубликации', false);
let list = new MessageList();
console.log(list.messages);
// console.log(list.get('5'));
// console.log(list.remove('6'));
// console.log(MessageList.validate(m2));
// console.log(list.add(m3));
console.log(list.edit('10', {text: 'Hello word'}));
console.log(list.messages);
console.log(list.getPage(0, 10, {text: 'многие'}));
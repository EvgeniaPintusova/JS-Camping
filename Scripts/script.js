const module = (function Module() {
   const messages = [
      {
         id: '1',
         text: 'Привет!',
         createdAt: new Date('2020-10-12T23:00:00'),
         author: 'ecoFfriend',
         isPersonal: true,
         to: 'my_word'
      },
      {
         id: '2',
         text: 'Какие дела?',
         createdAt: new Date('2020-10-13T03:00:10'),
         author: 'NotPlastic',
         isPersonal: false
      },
      {
          id: '3',
          text: 'Давно выяснено, что при оценке дизайна и композиции' + 
              'читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому,'+ 
              'что тот обеспечивает более или менее стандартное заполнение шаблона',
          createdAt: new Date('2020-10-12T22:10:10'),
          author: 'NotPlastic',
          isPersonal: false
       },
       {
          id: '4',
          text: 'А также реальное распределение букв и пробелов в абзацах,'+
              'которое не получается при простой дубликации',
          createdAt: new Date('2020-10-12T21:10:10'),
          author: 'ecoLifer',
          isPersonal: false
       },
       {
          id: '5',
          text: 'Многие программы электронной вёрстки и редакторы HTML'+
              'используют Lorem Ipsum в качестве текста по умолчанию,'+
              'так что поиск по ключевым словам "lorem ipsum" сразу показывает, '+
              'как много веб-страниц всё ещё дожидаются своего настоящего рождения.',
          createdAt: new Date('2020-10-12T23:10:10'),
          author: 'itsFantactic',
          isPersonal: true,
          to: 'ecoFriend'
       },
       {
          id: '6',
          text: 'За прошедшие годы текст Lorem Ipsum получил много версий.',
          createdAt: new Date('2020-10-12T23:10:10'),
          author: 'itsFantactic',
          isPersonal: false
       },
       {
          id: '7',
          text: 'Многие думают, что Lorem Ipsum - взятый с потолка'+
              'псевдо-латинский набор слов, но это не совсем так.'+ 
              'Его корни уходят в один фрагмент классической латыни 45 года н.э., '+
              'то есть более двух тысячелетий назад.',
          createdAt: new Date('2020-10-12T23:10:10'),
          author: 'itsFantactic',
          isPersonal: false
       },
       {
          id: '8',
          text: 'Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney,'+
              'штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur",'+
              'и занялся его поисками в классической латинской литературе.',
          createdAt: new Date('2020-10-12T23:10:10'),
          author: 'itsFantactic',
          isPersonal: false
       },
       {
          id: '9',
          text: 'В результате он нашёл неоспоримый первоисточник Lorem Ipsum '+
              'в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum"'+
              ' ("О пределах добра и зла"), написанной Цицероном в 45 году н.э.',
          createdAt: new Date('2020-10-12T23:10:10'),
          author: 'NotPlastic',
          isPersonal: false
       },
       {
          id: '10',
          text: 'Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", '+
              'происходит от одной из строк в разделе 1.10.32.',
          createdAt: new Date('2020-10-12T23:10:10'),
          author: 'itsFantactic',
          isPersonal: false
       }
    ];

   function getMessages() {
      console.log('Method is getMessageS');
   }
   function getMessage(id) {
      console.log('Method is getMessage');
      const result = messages.filter(m => m.id === id);
      return  result[0];
   }
   function validateMessage(message) {
      console.log('Method is validateMessage');
      let flag = true;
      let count = 0; //для кол-ва обязательных полей 
      for (const key in message){
         if (key === 'id' && typeof(message[key])==='string') { count++; }
         else if (key === 'text' && typeof(message[key])==='string' && message[key].length<=200) { count++; }
         else if (key === 'createdAt' && typeof(message[key])==='object') { count++; }
         else if (key === 'author' && typeof(message[key])==='string' && message[key]!=='') { count++; }
         else if (key === 'isPersonal' && typeof(message[key])==='boolean') { }
         else if (key === 'to' && typeof(message[key])==='string') { }
         else flag = false;
      }
     if (flag && count === 4) { return true; }
     else { return false; }
   }
   function  addMessage(message) {
      console.log('Method is addMessage');
      let size = messages.length;
      if (validateMessage(message)){ //проверим Сообщение ли это
         if (getMessage(message.id) === undefined){ //обеспечим уникальность id 
            messages.push(message);
            if (size<messages.length){ return true}
            else { return false; }
         }
         else { return false; }
      }
      else{ return false;}
   }
   function validatePart(message) {
      console.log('Method is validatePart');
      let flag = true;
      for (const key in message){
         if (key === 'id' && typeof(message[key])==='string') { }
         else if (key === 'text' && typeof(message[key])==='string' && message[key].length<=200) {}
         else if (key === 'createdAt' && typeof(message[key])==='object') { }
         else if (key === 'author' && typeof(message[key])==='string' && message[key]!=='') {}
         else if (key === 'isPersonal' && typeof(message[key])==='boolean') { }
         else if (key === 'to' && typeof(message[key])==='string') { }
         else flag = false;
      }
     if (flag) { return true; }
     else { return false; }
   }
   function  editMessage(id, message) {
      console.log('Method is editMessage');
      let flag = true;
      if (validateMessage(getMessage(id)) && validatePart(message) ){
         let m = getMessage(id);
         for (const key in message){
            if (key === 'text') { 
               m.text = message[key];
            }
            else if (key === 'isPersonal') {
               m.isPersonal = message[key];
            }
            else if (key === 'to') {
               m.to = message[key];
               m.isPersonal = true;
            }
            else { flag = false; }
         }
      }
      else { flag = false; }
      return flag;
   }
   function  removeMessage(id) {
      console.log('Method is removeMessage');
      let index = messages.indexOf(getMessage(id));
      let size = messages.length;
      if (index >-1){
         messages.splice(index, 1);
      }
      if (size>messages.length){return true;}
      else {return false;}
   }
   
   return {
       getMessages,
       getMessage,
       validateMessage,
       addMessage,
       editMessage,
       removeMessage
   };
})();
const message={
   id: '9',
   text: 'МВ результате он нашёл неоспоримый первоисточник Lorem Ipsum '+
       'в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum"'+
       ' ("О пределах добра и зла"), написанной Цицероном в 45 году н.э.',
   createdAt: new Date('2020-10-12T23:10:10'),
   author: 'NotPlastic',
   isPersonal: false
}
const message1={
   
      id: '15',
      text: 'А также реальное распределение букв и пробелов в абзацах,'+
          'которое не получается при простой дубликации',
      createdAt: new Date('2020-10-12T21:10:10'),
      author: 'ecoLifer',
      isPersonal: false,
      to: 'ghjk'
   
}
// console.log(module.getMessage('13')); 
// console.log(module.removeMessage('1'));
// console.log(module.validateMessage(message));
console.log(module.addMessage(message1));
console.log(module.removeMessage('15'));
// console.log(module.getMessage('9'))
// console.log(module.editMessage('9', { text: 'Allo! Hello!', to: 'daddy'}));
// console.log(module.getMessage('9'))




  
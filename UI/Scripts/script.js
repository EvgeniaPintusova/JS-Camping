const module = (function Module() {
   const user = {name: 'ecoFriend'}
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
          createdAt: new Date('2020-11-12T22:10:10'),
          author: 'NotPlastic',
          isPersonal: false
       },
       {
          id: '4',
          text: 'А также реальное распределение букв и пробелов в абзацах,'+
              'которое не получается при простой дубликации',
          createdAt: new Date('2020-09-12T21:10:10'),
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
       },
       {
         id: '11',
         text: 'Привет!',
         createdAt: new Date('2020-10-12T23:00:00'),
         author: 'ecoFfriend',
         isPersonal: true,
         to: 'my_word'
      },
      {
         id: '12',
         text: 'Какие дела?',
         createdAt: new Date('2020-10-13T03:00:10'),
         author: 'NotPlastic',
         isPersonal: false
      },
      {
          id: '13',
          text: 'Давно выяснено, что при оценке дизайна и композиции' + 
              'читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому,'+ 
              'что тот обеспечивает более или менее стандартное заполнение шаблона',
          createdAt: new Date('2020-11-12T22:10:10'),
          author: 'NotPlastic',
          isPersonal: false
       },
       {
          id: '14',
          text: 'А также реальное распределение букв и пробелов в абзацах,'+
              'которое не получается при простой дубликации',
          createdAt: new Date('2020-09-12T21:10:10'),
          author: 'ecoLifer',
          isPersonal: false
       },
       {
          id: '15',
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
          id: '16',
          text: 'За прошедшие годы текст Lorem Ipsum получил много версий.',
          createdAt: new Date('2020-10-12T23:10:10'),
          author: 'itsFantactic',
          isPersonal: false
       },
       {
          id: '17',
          text: 'Многие думают, что Lorem Ipsum - взятый с потолка'+
              'псевдо-латинский набор слов, но это не совсем так.'+ 
              'Его корни уходят в один фрагмент классической латыни 45 года н.э., '+
              'то есть более двух тысячелетий назад.',
          createdAt: new Date('2020-10-12T23:10:10'),
          author: 'itsFantactic',
          isPersonal: false
       },
       {
          id: '18',
          text: 'Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney,'+
              'штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur",'+
              'и занялся его поисками в классической латинской литературе.',
          createdAt: new Date('2020-10-12T23:10:10'),
          author: 'itsFantactic',
          isPersonal: false
       },
       {
          id: '19',
          text: 'В результате он нашёл неоспоримый первоисточник Lorem Ipsum '+
              'в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum"'+
              ' ("О пределах добра и зла"), написанной Цицероном в 45 году н.э.',
          createdAt: new Date('2020-10-12T23:10:10'),
          author: 'NotPlastic',
          isPersonal: false
       },
       {
          id: '20',
          text: 'Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", '+
              'происходит от одной из строк в разделе 1.10.32.',
          createdAt: new Date('2020-10-12T23:10:10'),
          author: 'itsFantactic',
          isPersonal: false
       }
    ];
    const filterObject = {
      autor: (item, author) => !author || item.author.toLowerCase().includes(author),
      text: (item, text) => !text || item.text.toLowerCase().includes(text),
      dateFrom:  (item, dateFrom) => !dateFrom || item.dateFrom > dateFrom,
      dateTo:  (item, dateTo) => !dateTo || item.dateTo < dateTo
    }
  
   function getMessages(skip = 0, top = 10, filterConfig) {
      // console.log('Method is getMessageS');
      for (const key in filterConfig){
        console.log(key, filterConfig[key]);
      }
      if (skip<0 || top<0){ return false; }
      let arr = messages.slice();
      Object.keys(filterConfig).forEach((key) => {
         arr = arr.filter((item) => filterObject[key](item, filterConfig[key]));
      });
      arr.sort((a,b)=>{
         return a.createdAt-b.createdAt;
      })
      arr = arr.slice(skip, skip+top);
      return arr;
   }
   function getMessage(id) {
      // console.log('Method is getMessage');
      const result = messages.find(m => m.id === id);
      return  result;
   }
   function validateMessage(message) {
      // console.log('Method is validateMessage');
      let flag = true;
      for (const key in message){
         if (key === 'id' && typeof(message[key])==='string') { }
         else if (key === 'text' && typeof(message[key])==='string' && message[key].length<=200) { }
         else if (key === 'createdAt' && typeof(message[key])==='object') { }
         else if (key === 'author' && typeof(message[key])==='string' && message[key]!=='') { }
         else if (key === 'isPersonal' && typeof(message[key])==='boolean') { }
         else if (key === 'to' && typeof(message[key])==='string') { }
         else flag = false;
      }
     if (flag) { return true; }
     else { return false; }
   }
   function  addMessage(message) {
      // console.log('Method is addMessage');
      message.id = `${+new Date()}`;
      // message.id = (++messages.length).toString();
      message.createdAt = new Date();
      message.author = user.name;
      let size = messages.length;
      if (validateMessage(message)){
         messages.push(message);
      }
      else { 
         if (message.text.length>200){
            message.text = message.text.slice(0,200);
            messages.push(message);
         }
      }
      if (size<messages.length){ return true; }
      else { return false; }
   }
   function  editMessage(id, message) {
      // console.log('Method is editMessage');
      let flag = true;
      let m = getMessage(id);
      if (validateMessage(message)){
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
      // console.log('Method is removeMessage');
      let index = messages.findIndex( m => m.id === id );
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
   text: 'В результате он нашёл неоспоримый первоисточник Lorem Ipsum '+
       'в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum"'+
       ' ("О пределах добра и зла"), написанной Цицероном в 45 году н.э.',
   isPersonal: false
}
const message1={
      text: 'А также реальное распределение букв и пробелов в абзацах,'+
          'которое не получается при простой дубликации',
      isPersonal: 1,
      to: 'ghjk'
}
const message2={
   text: 'В результате он нашёл неоспоримый первоисточник Lorem Ipsum '+
       'в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum"'+
       ' ("О пределах добра и зла"), написанной Цицероном в 45 году н.э.',
   isPersonal: false
}
const message3={
   text: 'В результате он нашёл неоспоримый первоисточник Lorem Ipsum '+
       'в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum"'+
       ' ("О пределах добра и зла"), написанной Цицероном в 45 году н.э.',
   isPersonal: true,
   to: 'otherUser'
}
const message4={
   text: 'В результате он нашёл неоспоримый первоисточник Lorem Ipsum '+
       'в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum"'+
       ' ("О пределах добра и зла"), написанной Цицероном в 45 году н.э.',
   isPersonal: false
}
// console.log(module.getMessage('13')); 
// console.log(module.getMessage('43')); //undefined, т к нет сообщения с id = '43'
// console.log(module.validateMessage(message)); //true
// console.log(module.validateMessage(message1)); //false, т к isPersonal - число
// console.log(module.addMessage(message3)); //true
// console.log(module.addMessage(message4)); //true
// console.log(module.editMessage('9', { text: 'Allo! Hello!', to: 'daddy'})); //true
// console.log('EditMessage:', module.getMessage('9'));
// console.log(module.editMessage('9', { text: 'Allo! Hello!', author: 'daddy'})); //false, т к поле author нельзя менять
// console.log(module.removeMessage('15')); //true
// console.log(module.removeMessage('25')); //false, т к нет сообщения с id = '25'
// console.log(module.getMessages(0,20)); //все сообщения, сортированные по дате
console.log(module.getMessages(0, 10, {author: 'itsFantactic' })) //начиная с 4-го элемента, 7 сообщений, сортированных по дате
// console.log(module.getMessages(-3,7));//false, т к нельзя работать с отрицательными входными данными
// console.log(module.getMessages());//используются параметры по умолчанию: 0, 10





  
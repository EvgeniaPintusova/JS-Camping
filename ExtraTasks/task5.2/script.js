function createList(title, list){
    let createlist = `<ul>${title}`;
    createlist += paragraph(list);
    createlist += `</ul>`;
    document.getElementById("list").innerHTML = createlist;
}
function paragraph(list){
    let i=0;
    let element = '';
     while (list[i]){
        element += `<li> ${list[i].value}`;
        console.log(list[i].value);
        if(list[i].children){
            element += `<ul>`;
            paragraph(list[i].children);
            element += `</ul>`;
        }
        element += `</li>`;
        i++;
    }
    return element;
}
const list = [
  {
     value: 'Пункт 1.',
     children: null,
  },
  {
     value: 'Пункт 2.',
     children: [
        {
           value: 'Подпункт 2.1.',
           children: null,
        },
        {
           value: 'Подпункт 2.2.',
           children: [
              {
                 value: 'Подпункт 2.2.1.',
                 children: null,
              },
              {
                 value: 'Подпункт 2.2.2.',
                 children: null,
              }
           ],
        },
        {
           value: 'Подпункт 2.3.',
           children: null,
        }
     ]
  },
  {
     value: 'Пункт 3.',
     children: null,
  },
  {
     value: 'Пункт 4.',
     children: [{
                value: 'Пункт 4.1.',
                children: null,
            }]
  }
];
createList("ПУНКТЫ", list);
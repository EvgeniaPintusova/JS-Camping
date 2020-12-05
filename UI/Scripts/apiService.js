class ChatApiService {
  constructor() {
    this._url = "https://jslabdb.datamola.com/";
  }
  getMessages() {
    fetch(`${this._url}messages?skip=0&top=10`, {
      method: "GET",
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        return data;
      });
  }
  getUsers() {
    return fetch(`${this._url}users`, {
      method: "GET",
    }).then((data) => {
      console.log(data);
      return data;
    });
  }
}
const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    authorization: "Bearer " + this.token,
  },
  body: JSON.stringify(body),
});

const chat = new ChatApiService();
const m = chat.getMessages();
console.log(m);

class ChatApiService {
  constructor() {
    this._url = "https://jslabdb.datamola.com/";
  }
  async registration() {
    try {
      const form = document.getElementById("registration-form");
      let formdata = new FormData(form);
      formdata.append("name", form.newLogin.value);
      formdata.append("pass", form.newPassword.value);
      const response = await fetch(
        "https://jslabdb.datamola.com/auth/register",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formdata,
        }
      ).then((data) => data.json());
      if (response.error) {
        throw new Error(response.error);
      }
      localStorage.setItem("token", response.token);
      alert("ok");
      successRegistration();
      return true;
    } catch (e) {
      alert("error");
      errorRegistration();
      return false;
    }
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
      });
  }
  getUsers() {
    fetch(`${this._url}users`, {
      method: "GET",
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
      });
  }
}

const chat = new ChatApiService();
chat.getMessages();
chat.getUsers();
function errorRegistration() {
  document.getElementById("newLogin").style.border = "2px solid red";
  document.getElementById("registration-login-message").textContent =
    "Придумайте другой логин.";
}
function successRegistration() {
  document.getElementById("registration-page").style.display = "none";
  document.getElementById("login-page").style.display = "flex";
}

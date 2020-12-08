class ChatApiService {
  constructor() {
    this._url = "https://jslabdb.datamola.com/";
  }
  async registration() {
    try {
      let formdata = new FormData(document.getElementById("registration-form"));
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
      return true;
    } catch (e) {
      // document.getElementById("error").style.display = "block";
      return false;
    }
  }
}

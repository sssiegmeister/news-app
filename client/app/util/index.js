export default class Util {

  static register(user) {
    console.log("Register");
    return fetch('/api/user/register',{
      credentials: 'include',
      method: 'POST',
      headers: header,
      body: JSON.stringify(user)
    }).then((result) => result.json());
  }

  static getLoggedInUser() {
    console.log("Get logged in");
    return fetch('/api/user/loggedIn', {
      credentials: 'include',
      method: 'GET',
      headers: header
    }).then((result) => {
      if (result.ok) {
        return result.json();
      } else {
        throw ("Failed to fetch logged in user");
      }
    })
      .catch((error) => {
        console.log(error);
      });
  }

  static login(user) {
    return fetch('/api/users/login', {
      method: 'POST',
      headers: header,
      body: JSON.stringify(user)
    }).then((response) => response.json())
      .catch((error) => {
        console.log(error);
        return {error: true}
      });
  }
}

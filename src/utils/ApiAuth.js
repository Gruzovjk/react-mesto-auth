const BASE_URL = "https://auth.nomoreparties.co/";

const request = (url, options) => {
  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`${res.status}: ${res.statusText}`);
    }
  });
};

const signUp = (email, password) => {
  return request(`${BASE_URL}signup`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email, password}),
  });
};

const signIn = (email, password) => {
  return request(`${BASE_URL}signin`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email, password}),
  });
};

const checkToken = (token) => {
  return request(`${BASE_URL}users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export {signUp, signIn, checkToken};

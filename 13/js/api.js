const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  POST_DATA: '/'
};
const Method = {
  GET: 'GET',
  POST: 'POST'
};
const load = (route, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    });
const getData = () => load(Route.GET_DATA);
const sendData = (body) => load(Route.POST_DATA, Method.POST, body);

export {getData, sendData};

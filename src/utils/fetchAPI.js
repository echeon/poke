const noop = () => {};

const fetchAPI = (url, successCallback = noop, errorCallback = noop) => (
  fetch(url)
    .then(response => response.json())
    .then(successCallback)
    .catch(errorCallback)
);

export default fetchAPI;

const noop = () => {};

const fetchAPIs = (urls, successCallback = noop, errorCallback = noop) => (
  Promise.all(urls.map(fetch))
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then(successCallback)
    .catch(errorCallback)
);

export default fetchAPIs;

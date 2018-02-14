window.onload = function () {
  const form = document.getElementById('search-form');
  const searchField = document.getElementById('search-keyword');
  const responseContainer = document.getElementById('response-container');
  form.addEventListener('submit', function (event) {

    event.preventDefault();
    responseContainer.innerHTML = '';
    const searchedForText = searchField.value;
    
    // Utilizando FETCH
    fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=65082f4668484e9484931f976feb3d4c`)
      .then(handleErrors)
      .then(parseJSON)
      .then(getNews)
      .catch(displayErrors);
  });

  function handleErrors(res) {
    if (!res.ok) {
      throw Error(res.status);
    }
    return res;
  }

  function parseJSON(res) {
    return res.json()
      .then(function(data) {
        return data.response.docs;
      });
  }

  function getNews(response) {
    response.forEach(function(element) {
      const snippet = element.snippet;
      let li = document.createElement('li');
      li.className = 'article';
      li.innerText = snippet;
      responseContainer.appendChild(li);
    });
  }

  function displayErrors(err) {
    console.log('INSIDE displayErrors!');
    console.log(err);
  }
};
function begin() {
  const $buttonImages = $('#button-images');
  const $containerImages = $('#container-images');
  
  $buttonImages.on('click', function(e) {
    e.preventDefault();
  
    const url = `https://swapi.co/api/people/`;
  
    fetch(url)
    /* Si todo esta bien corre el programa, sino saldra el error */
      .then(handleErrors) 
      .then(parseJSON)
      .then(updateArticle)
      .catch(displayErrors);
  });
  
  function handleErrors(res) {
    if (!res.ok) {
      throw Error(res.status);
    }
    return res;
  }
  
  function parseJSON(res) {
    return res.json();
  }
  
  function updateArticle(data) {
    console.log(data);
    const character = data.results;
    
    character.forEach(function(element) {
      const name = element.name;
    });
  }
  
  function displayErrors(err) {
    console.log('INSIDE displayErrors!');
    console.log(err);
  }
};

$(document).ready(begin());
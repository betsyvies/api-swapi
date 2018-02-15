function begin() {
  const $buttonImages = $('#button-images');
  const $containerImages = $('#container-img');
  
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

      flickrApi = 'https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?'
      flickrOptions = {
        tags: name,
        format: 'json'
      }

      const renderPhotos = (data) => {
        console.log(data);
        const photo = data.items

        photo.forEach(function(element) {
          // console.log(photo.media);
          $containerImages.append(`<div class="col-xs-3 col-md-3 col-lg-3">
          <img src="${element.media.m}" alt="img1" class="img-responsive">
        </div>`)
        });
      }

      $.getJSON(flickrApi, flickrOptions, renderPhotos)
    });
  }
  
  function displayErrors(err) {
    console.log('INSIDE displayErrors!');
    console.log(err);
  }
};

$(document).ready(begin());
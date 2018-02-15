function begin() {
  const $buttonImages = $('#button-images');
  const $containerImages = $('#container-img');
  
  $buttonImages.on('click', function(e) {
    e.preventDefault();
  
    const url = 'https://swapi.co/api/people/';
  
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
      const birth = element.birth_year;
      const gender = element.gender;
      const skin = element.skin_color;
      const height = element.height;
      const mass = element.mass;
      const hair = element.hair_color;

      flickrApi = 'https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';
      flickrOptions = {
        tags: name,
        format: 'json'
      };

      const renderPhotos = (data) => {
        console.log(data);
        const photo = data.items;

        photo.forEach(function(element) {
          // console.log(photo.media);
          $containerImages.append(`<div class="col-xs-3 col-md-3 col-lg-3">
          <a href="" data-toggle="modal" data-target="#modalImages">
          <img src="${element.media.m}" alt="img1" class="img-responsive images" data-birth="${birth}" data-gender="${gender}"
          data-skin="${skin}" data-height="${height}" data-mass="${mass}" data-hair"${hair} data-name="${name}" data-img="${element.media.m}">
          </a>
        </div>`);
        });
        const $dataModal = $('#container-img a[data-toggle=modal]');
        
        /* Al darle click a la imagen se mostrará un modal con la información*/
        $dataModal.on('click', function() {
          let dataImg = $(this).children().attr('data-img'); 
          let dataName = $(this).children().attr('data-name');
          let dataBirth = $(this).children().attr('data-birth');
          let dataGender = $(this).children().attr('data-gender');
          let dataSkin = $(this).children().attr('data-skin');
          let dataHeight = $(this).children().attr('data-height');
          let dataMass = $(this).children().attr('data-mass');
          let dataHair = $(this).children().attr('data-hair');

          $($(this).data('target') + ' .modal-header img ').attr('src', dataImg);
          $($(this).data('target') + ' .modal-header h1').text(dataName);
          $($(this).data('target') + ' .modal-body #birth').text('Birth: ' + dataBirth);
          $($(this).data('target') + ' .modal-body #gender').text('Gender: ' + dataGender);
          $($(this).data('target') + ' .modal-body #skin').text('Skin: ' + dataSkin);
          $($(this).data('target') + ' .modal-body #height').text('Height' + dataHeight);
          $($(this).data('target') + ' .modal-body #mass').text('Mass: ' + dataMass);
          $($(this).data('target') + ' .modal-body #hair').text('Hair ' + dataHair);
        });
      };

      $.getJSON(flickrApi, flickrOptions, renderPhotos);
    });
  }
  
  function displayErrors(err) {
    console.log('INSIDE displayErrors!');
    console.log(err);
  }
};

$(document).ready(begin());
function begin() {
  const $buttonImages = $('#button-images');
  const $buttonGifs = $('#button-gifs');
  const $containerImages = $('#container-img');

  $buttonImages.on('click', function(e) {
    e.preventDefault();
    let arrNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    arrNum.forEach(function(element) {
      const url = 'https://swapi.co/api/people/?page=' + element;
  
      fetch(url)
      /* Si todo esta bien corre el programa, sino saldra el error */
        .then(handleErrors) 
        .then(parseJSON)
        .then(updateImages)
        .catch(displayErrors);
    }); 
    $containerImages.html('');
  });

  $buttonGifs.on('click', function(e) {
    e.preventDefault();

    let arrNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    arrNum.forEach(function(element) {
      const url = 'https://swapi.co/api/people/?page=' + element;
  
      fetch(url)
      /* Si todo esta bien corre el programa, sino saldra el error */
        .then(handleErrors) 
        .then(parseJSON)
        .then(updateGifs)
        .catch(displayErrors);
    }); 
    $containerImages.html('');
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
  
  function updateImages(data) {
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

      /* API para imagenes */
      var xhr = $.get(`http://api.giphy.com/v1/gifs/search?q=${name}&api_key=OSe4zJXxbqnnpvX8gu03uha3zOLXK5Lq`);
      xhr.done(function(data) { 
        console.log(data); 
        const img = data.data[5].images['480w_still'].url;

        $containerImages.append(`<div class="col-xs-6 col-md-4 col-lg-3">
          <a href="" data-toggle="modal" data-target="#modalImages">
          <img src="${img}" alt="img1" class="img-responsive images" data-birth="${birth}" data-gender="${gender}"
          data-skin="${skin}" data-height="${height}" data-mass="${mass}" data-hair"${hair} data-name="${name}" data-img="${img}">
          </a>
        </div>`);

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
          $($(this).data('target') + ' .modal-body #height').text('Height: ' + dataHeight);
          $($(this).data('target') + ' .modal-body #mass').text('Mass: ' + dataMass);
          $($(this).data('target') + ' .modal-body #hair').text('Hair: ' + dataHair);
        });
      });
    });
  }

  function updateGifs(data) {
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

      /* API para gifs */
      var xhr = $.get(`http://api.giphy.com/v1/gifs/search?q=${name}&api_key=OSe4zJXxbqnnpvX8gu03uha3zOLXK5Lq`);
      xhr.done(function(data) { 
        console.log(data); 
        const gif = data.data[1].images.fixed_height_downsampled.url;

        $containerImages.append(`<div class="col-xs-6 col-md-4 col-lg-3">
          <a href="" data-toggle="modal" data-target="#modalImages">
          <img src="${gif}" alt="img1" class="img-responsive images" data-birth="${birth}" data-gender="${gender}"
          data-skin="${skin}" data-height="${height}" data-mass="${mass}" data-hair"${hair} data-name="${name}" data-img="${gif}">
          </a>
        </div>`);

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
          $($(this).data('target') + ' .modal-body #height').text('Height: ' + dataHeight);
          $($(this).data('target') + ' .modal-body #mass').text('Mass: ' + dataMass);
          $($(this).data('target') + ' .modal-body #hair').text('Hair: ' + dataHair);
        });
      });
    });
  }
  
  function displayErrors(err) {
    console.log('INSIDE displayErrors!');
    console.log(err);
  }
};

$(document).ready(begin());
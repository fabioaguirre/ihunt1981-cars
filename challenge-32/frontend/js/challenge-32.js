(function($) {
  'use strict';

  function allCarsApp() {
    var carsTableGet = $('[data-js="carsTable"]').get();
    $('[data-js="form-insert"]').on('submit', handleSubmitFormCar);

    function handleSubmitFormCar(event) {
      event.preventDefault();
      postCarInfoTable();
      getLastCarFromGet()
      clearInputs();
    }

    function removeCar(e) {
      e.preventDefault();
      carsTableGet.removeChild(this.parentNode.parentNode);
    }

    function postCarInfoTable() {
      var post = new XMLHttpRequest();
      post.open('POST', 'http://localhost:3000/car/');
      post.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      post.send('image='+$('[data-js="carImage"]').get().value+'&brandModel='+$('[data-js="carBrandModel"]').get().value+'&year='+$('[data-js="carYear"]').get().value+'&plate='+$('[data-js="carPlate"]').get().value+'&color='+$('[data-js="carColor"]').get().value+'');
      console.log('Inserindo carro');
      post.onreadystatechange = function() {
        if( isRequestOk.call(this) ) {
          console.log('Carro cadastrado', post.responseText);
        }
      };
    }

    function clearInputs() {
      $('input').forEach(function(item) {
        item.value='';
      });
    }

    function showCompanyData() {
      var ajax = new XMLHttpRequest();
      ajax.open('GET', '/company.json');
      ajax.send();
      ajax.addEventListener('readystatechange', function() {
        if ( isRequestOk.call(this) ) {
          var dataCompany = JSON.parse(ajax.responseText);
          $('[data-js="company-name"]').get().textContent = dataCompany.name;
          $('[data-js="company-phone"]').get().textContent = dataCompany.phone;
        }
      }, false);
    }
    showCompanyData();

    function isRequestOk() {
      return this.readyState === 4 && this.status === 200;
    }

    var get = new XMLHttpRequest();
    function getOpenSend() {
      get.open('GET', 'http://localhost:3000/car');
      get.send();
    }

    function getCarsFromGet() {
      getOpenSend();
      get.onreadystatechange = function() {
        if( isRequestOk.call(this) ) {
          var carJSONData = JSON.parse(get.responseText);
          if (carJSONData.length != 0) {
            carJSONData.forEach(function(item) {
              createCarInfoTableFromGet(item);
            });
          }
        }
      };
    }
    getCarsFromGet();

    function getLastCarFromGet() {
      getOpenSend();
      get.onreadystatechange = function() {
        if( isRequestOk.call(this) ) {
          var carJSONData = JSON.parse(get.responseText);
          createCarInfoTableFromGet(carJSONData[carJSONData.length-1]);
        }
      };
    }

    function createCarInfoTableFromGet(element) {
        var newTR = document.createElement('tr');
        var carFieldsValues = [ element.image, element.brandModel, element.year, element.plate, element.color ];
        var $image = document.createElement('img');
        $image.setAttribute('src', carFieldsValues[0]);
        var newTD = document.createElement('td');
        newTD.appendChild($image);
        newTR.appendChild(newTD);
        for (var i = 1; i <= 4; i++) {
          var newTD = document.createElement('td');
          var textForTD = document.createTextNode(carFieldsValues[i]);
          newTD.appendChild(textForTD);
          newTR.appendChild(newTD);
        }
        newTR.innerHTML += '<td><button type="submit" data-js="removeCar">Remover</button></td>';
        carsTableGet.appendChild(newTR);
        $('[data-js="removeCar"]').on('click', removeCar);
    }

  }

  allCarsApp();

})(window.DOM);

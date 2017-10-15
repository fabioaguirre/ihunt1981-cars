(function($) {
  'use strict';

  /*
  Agora vamos criar a funcionalidade de "remover" um carro. Adicione uma nova
  coluna na tabela, com um botão de remover.
  Ao clicar nesse botão, a linha da tabela deve ser removida.
  */

  function allCarsApp() {
    var carsTableGet = $('[data-js="carsTable"]').get();
    $('[data-js="form-insert"]').on('submit', handleSubmitFormCar);

    function handleSubmitFormCar(event) {
      event.preventDefault();
      createCarInfoTable();
      clearInputs();
    }

    function removeCar(e) {
      e.preventDefault();
      carsTableGet.removeChild(this.parentNode.parentNode);
    }

    function createCarInfoTable() {
      var newTR = document.createElement('tr');
      var carFieldsValues = [ $('[data-js="carImage"]').get().value, $('[data-js="carBrandModel"]').get().value, $('[data-js="carYear"]').get().value, $('[data-js="carPlate"]').get().value, $('[data-js="carColor"]').get().value ];
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
  }

  allCarsApp();

})(window.DOM);

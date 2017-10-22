(function($) {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */

  function allCarsApp() {
    $('[data-js="form-insert"]').on('submit', handleSubmitFormCar);

    function handleSubmitFormCar(event) {
      event.preventDefault();
      createCarInfoTable();
      clearInputs();
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
      $('[data-js="carsTable"]').get().appendChild(newTR);
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

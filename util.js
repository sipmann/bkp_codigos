/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, jquery:true, indent:4, maxerr:200 */

(function(window) {
  'use strict';
  var util = {
    //Realiza os request retornando uma Promise com o sucesso ou erro.
    request: function(pg, params) {

    },

    //Faz o request para da página .html e adiciona o conteúdo do request no
    //destino especificado. Este também retorna uma Promise.
    //TODO adicionar parâmetros e uma possível chamada ao um metodo de inicialização da tela
    navegar: function(pg, destino) {
      return new Promise(function(done, err) {
        //Se o destino não for especificado o document.body será utilizado no lugar.
        if (!destino) {
          destino = document.body;
        }

        this.request(pg)
          .then(function(data) {

            //Alimenta o conteúdo no destino e dispara o retorno de sucesso da
            //Promise.
            destino.innerHTML = data;
            done();
          })
          .catch(function(err) {

          });
      });
    },

    //Cria um simples alerta em alguma posição da página por um determinado
    //tempo. Tem como objetivo ser simples e não intrusivo.
    simpleAlert: function(msg, titulo, configs) {
      var conf = {
        segundos: 5,
        posicao: 'rodape'
      };

      this.confExtend(conf, configs);
    },

    //Semelhante ao jQuery.extend.
    confExtend: function(base, novo) {
      for (var k in novo) {
        if (!base[k] || base[k] !== novo[k]) {
          base[k] = novo[k];
        }
      }

      return base;
    }
  };

  window.util = util;

  if (typeof window.define === "function" && window.define.amd) {
    window.define("util", [], function() {
      return window.util;
    });
  }

})(typeof window === 'undefined' ? this : window);

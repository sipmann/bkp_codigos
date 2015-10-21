/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, jquery:true, indent:4, maxerr:200 */

(function(window) {
  'use strict';
  var util = {
    //Realiza os request retornando uma Promise com o sucesso ou erro.
    request: function(pg, params) {
      return new Promise(function(done, err) {

        var config = {
          method: 'POST'
        };

        if (params) {
          util.confExtend(conf, params);
        }

        var xmlhttp=new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
          //Se terminou o request e o statusCode é 200 então retorna positivo
          //do contrário retorna o statusCode apenas
          if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
              done(xmlhttp.responseText);
            } else {
              err(htmlhttp.status);
            }
          } else {
            //TODO
          }
        };

        xmlhttp.open(config.method, pg, true);

        //Se o tipo de request for POST, adicionamos o Content-type no cabeçalho
        //do request
        if (config.method === 'POST') {
          xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        }

        xmlhttp.send();
      });
    },

    //Faz o request para da página .html e adiciona o conteúdo do request no
    //destino especificado. Este também retorna uma Promise.
    navegar: function(pg, destino) {
      return new Promise(function(done, erro) {
        //Se o destino não for especificado o document.body será utilizado no lugar.
        if (!destino) {
          destino = document.body;
        }

        util.request(pg)
          .then(function(data) {
            //Alimenta o conteúdo no destino e dispara o retorno de sucesso da
            //Promise.
            destino.innerHTML = data;
            done();
          })
          .catch(function(err) {
            erro(err);
          });
      });
    },

    //Cria um simples alerta em alguma posição da página por um determinado
    //tempo. Tem como objetivo ser simples e não intrusivo.
    //TODO tratar posicionamento do alerta
    simpleAlert: function(msg, configs) {
      var conf = {
        segundos: 5,
        posicao: 'rodape'
      };

      if (configs) {
        this.confExtend(conf, configs);
      }

      var dvAviso = document.createElement('div');
      dvAviso.className = 'simpleAlert';
      dvAviso.innerHTML = msg;

      document.body.appendChild(dvAviso);

      //Dado o tempo tempo definido nas configurações o alerta será removido.
      setTimeout(function() {
        //Caso o alerta já tenha sido removido por alguma `força` externa...
        if (dvAviso) {
          document.body.removeChild(dvAviso);
          dvAviso = null;
        }

        //Obviamento o '* 1000' é para o fato de ser em milesegundos o timeout.
      }, conf.segundos * 1000);

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

  //Adiciona as funcoes no window.
  window.util = util;

  //Trata a utilização ou não de metodos AMD.
  if (typeof window.define === "function" && window.define.amd) {
    window.define("util", [], function() {
      return window.util;
    });
  }

})(typeof window === 'undefined' ? this : window);

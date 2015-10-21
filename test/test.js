var assert = require("assert")

var util = require('../util').util;
var Document = require('../mocks/html').Document;
var XMLHttpRequest = require('../mocks/httpRequest').XMLHttpRequest;

var document;
describe('Util', function() {

  beforeEach(function() {
    document = new Document();
    global.document = document;
    global.XMLHttpRequest = XMLHttpRequest;
  });

  describe('navegar', function() {
    it('deve carregar um b', function(done) {
      var dst = document.createElement('div');

      util.navegar('pgNaoExistente', dst)
      .then(function() {
        assert.equal(dst.innerHTML, '<b>ola</b>');
        done();
      }).then(null, function(err) {
        done(err);
      });

    });

    it('deve utilizar o document.body quando nao for passado o destino', function(done) {
      util.navegar('pgNaoExistente')
      .then(function() {
        assert.equal(document.body.innerHTML, '<b>ola</b>');
        done();
      }).then(null, function(err) {
        done(err);
      });

    });

    it('deve disparar um erro 404 quando a pagina não for localizada', function(done) {
      util.navegar('pgExistenteSQN')
      .then(function() {
        done(assert.equal(200, 404));
      }).then(null, function(err) {
        try {
          done(assert.equal(404, err));
        } catch(ex) {
          done(ex);
        }
      });

    });
  });

  describe('simpleAlert', function() {
    context('sem passar nenhuma configuracao', function() {
      it('deve gerar o alerta no document.body', function() {
        util.simpleAlert('Aviso aleatório');
        assert.equal(document.body.childNodes.length, 1);
        assert.equal(document.body.childNodes[0].nodeName, 'DIV');
        assert.equal(document.body.childNodes[0].className, 'simpleAlert');
      });
    });

    context('passando uma configuracao', function() {
      it('deve gerar o alerta no document.body e desaparecer apos 1.5 segundos', function(done) {
        util.simpleAlert('Aviso aleatório', {segundos:1.5});
        assert.equal(document.body.childNodes.length, 1);
        assert.equal(document.body.childNodes[0].nodeName, 'DIV');
        assert.equal(document.body.childNodes[0].className, 'simpleAlert');

        setTimeout(function() {
          assert.equal(document.body.childNodes.length, 0);
          done();
        }, 1510); //10 milesegundos a mais para garantir a ordem de execução

      });
    });
  });

  describe('confExtend', function () {
    it('deve mesclar um objeto no outro', function() {
      var obj1 = {
        nome: 'Teste',
        sobrenome: 'Sipmann'
      };

      var obj2 = {
        nome: 'Mauricio',
        idade: 999
      };

      var objResult = {
        nome: 'Mauricio',
        sobrenome: 'Sipmann',
        idade: 999
      };

      assert.equal(JSON.stringify(objResult), JSON.stringify(util.confExtend(obj1, obj2)));
    });

    it('deve mesclar um objeto no outro levando um array todo', function() {
      var obj1 = {
        nome: 'TABELAYXZ',
        linhas: [{
            codigo: 1,
            nome: 'Laranja'
          },
          {
            codigo: 2,
            nome: 'Bergamota'
          }
        ]
      };

      var obj2 = {
        nome: 'TABELAYXZ',
        linhas: [{
            codigo: 2,
            nome: 'Limão'
          }]
      };

      var objResult = {
        nome: 'TABELAYXZ',
        linhas: [{
            codigo: 2,
            nome: 'Limão'
          }
        ]
      };

      assert.equal(JSON.stringify(objResult), JSON.stringify(util.confExtend(obj1, obj2)));
    });
  });
});

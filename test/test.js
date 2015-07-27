var assert = require("assert")

var util = require('../util').util;

describe('Util', function() {

  describe('navegar', function() {
    it('deve carregar um b', function(done) {

      var dst = { innerHTML: '' };
      util.navegar('pgNaoExistente', dst)
      .then(function() {
        assert.equal(dst.innerHTML, '<b>ola</b>');
        done();
      }).then(null, function(err) {
        done(err);
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

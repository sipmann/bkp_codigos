var assert = require("assert")

var util = require('../util').util;

describe('Util', function() {
  describe('confExtend', function () {
    it('deve mesclar um objeto no outro', function() {
      var obj1 = {
        nome: "Teste",
        sobrenome: "Sipmann"
      };

      var obj2 = {
        nome: "Mauricio",
        idade: 999
      };

      var objResult = {
        nome: "Mauricio",
        sobrenome: "Sipmann",
        idade: 999
      };

      assert.equal(JSON.stringify(objResult), JSON.stringify(util.confExtend(obj1, obj2)));
    });
  });
});

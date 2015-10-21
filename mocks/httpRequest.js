var fs = require('fs');

function XMLHttpRequest() {
  this.responseText;
  this.readyState;
  this.status;
  this.onreadystatechange;

  //Array que armazena as possíveis chamadas e seus retornos.
  this.pgs = [];
}

XMLHttpRequest.prototype.open = function(method, destination, assync) {
  this.method = method;
  this.destination = destination;
  this.assync = assync;
};

XMLHttpRequest.prototype.send = function(params) {
  var _this = this;
  this.readyState = 4;
  this.status = 200;

  fs.readFile('./test/pgs/' + this.destination, 'utf8', function (err,data) {
    if (err) {
      _this.responseText = err;
      _this.status = 404;
    } else
      _this.responseText = data;

    if (_this.onreadystatechange)
      _this.onreadystatechange();

  });
};

XMLHttpRequest.prototype.setRequestHeader = function(key, value) {

};

exports.XMLHttpRequest = XMLHttpRequest;

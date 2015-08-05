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

  this.readyState = 4;
  this.status = 200;

  if (this.onreadystatechange)
    this.onreadystatechange();
};

XMLHttpRequest.prototype.setRequestHeader = function(key, value) {

};

exports.XMLHttpRequest = XMLHttpRequest;

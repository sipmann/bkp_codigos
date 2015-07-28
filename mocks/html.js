//
//Um simples mock para facilitar os testes.
//

function Element(nome) {
  this.nodeName = nome.toUpperCase();
  this.childs = [];
  this.html;
};

Element.prototype.appendChild = function(obj) {
  this.childs.push(obj);
  this.innerHTML = '';
}

function Document() {
  this.childs = [];
  this.body = new Element('body');
}

Document.prototype.createElement = function(nome) {
  return new Element(nome);
};

Element.prototype.appendChild = function(obj) {
  this.childs.push(obj);
}

exports.Document = Document;

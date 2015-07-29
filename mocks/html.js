//
//Um simples mock para facilitar os testes.
//

function Element(nome) {
  this.nodeName = nome.toUpperCase();
  this.childNodes = [];
  this.html;
};

Element.prototype.appendChild = function(obj) {
  this.childNodes.push(obj);
  this.innerHTML = '';
};

Element.prototype.removeChild = function(obj) {
  for(var i = 0; i < this.childNodes.length; i++) {
    if (this.childNodes[i] === obj) {
      this.childNodes.splice(i, 1);
    }
  }
};

function Document() {
  this.childNodes = [];
  this.body = new Element('body');
}

Document.prototype.createElement = function(nome) {
  return new Element(nome);
};

Element.prototype.appendChild = function(obj) {
  this.childNodes.push(obj);
};

exports.Document = Document;

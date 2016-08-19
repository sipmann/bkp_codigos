/* global util */

class LilFramework {
  constructor () {
    this.navDest = 'dvMain';
    this.controllers = [];
  }

  init () {
    this.addNav(document);
  }

  navegar (view) {
    const self = this;
    util.navegar('view/' + view +'.html', document.querySelector('#' + self.navDest))
    .then(function() {
      //adiciona recursivamente navegacoes
      self.addNav(document.querySelector('#' + self.navDest));
      if (self.controllers[view])
        self.controllers[view].init(document.querySelector('#' + self.navDest));
    })
    .catch(function(a) {
      util.navegar('assets/404.html', document.querySelector('#' + self.navDest));
    });
  }

  addNav (context) {
    const links = context.querySelectorAll('[role=link]');

    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', this.navegaApp.bind(this));
    }
  }

  navegaApp (e) {
    const view = e.currentTarget.getAttribute('pg');
    this.navegar(view);
  }

  addController (view, ctrl) {
    this.controllers[view] = ctrl;
  }
  
  metodo (acao, parametros) {
    
  }
}

class AppElectron extends App {
  metodo (acao, parametros) {
    return ipcRenderer.sendSync(acao, parametros);
  }
}

/* USAGE
const app = new AppElectron();
app.navDest = 'main';
app.addController('processos/processos', new Processos());
app.addController('processos/listagem', new ProcessosListagem());

app.init();
*/

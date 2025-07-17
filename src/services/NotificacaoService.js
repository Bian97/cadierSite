let notificacaoHandler = {
  showErro: (msg) => console.error(msg),
  showSucesso: (msg) => console.log(msg),
  showInfo: (msg) => console.info(msg)
};

export function registrarNotificacaoHandler(novoHandler) {
  notificacaoHandler = novoHandler;
}

export function showErro(msg) {
  notificacaoHandler.showErro(msg);
}

export function showSucesso(msg) {
  notificacaoHandler.showSucesso(msg);
}

export function showInfo(msg) {
  notificacaoHandler.showInfo(msg);
}

import { LOGIN, LOGOUT, LOGINSEMCONTA } from "../actions/UserActions";

const user = (state = { estaLogado: false, documento: "", numero: "", atendente: false, token: "", possuiConta: false }, action) => {
  switch (action.type) {      
    case LOGIN:
      const { documento, numero, atendente, token, situacao, nome } = action.payload;
      return {
        estaLogado: true,
        documento,
        numero,
        atendente,
        token,
        possuiConta: true,
        situacao,
        nome
      };
    case LOGINSEMCONTA:
      return {
        estaLogado: true,
        documento: "",
        numero: "",
        atendente: false,
        token: "",
        possuiConta: false,
        situacao: "Visitante",
        nome: ""
      };
    case LOGOUT:
      return {
        estaLogado: false,
        documento: "",
        numero: "",
        atendente: false,
        token: "",
        possuiConta: false,
        situacao: "",
        nome: ""
      };
    default:
      return state;
  }
};
  
export default user;
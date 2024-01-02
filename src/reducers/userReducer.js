import { LOGIN, LOGOUT } from "../actions/UserActions";

const user = (state = { estaLogado: false, documento: "", numero: "", atendente: false, token: "" }, action) => {
  switch (action.type) {      
    case LOGIN:
      const { documento, numero, atendente, token } = action.payload;
      return {
        estaLogado: true,
        documento,
        numero,
        atendente,
        token
      };
    case LOGOUT:
      return {
        estaLogado: false,
        username: "",
      };
    default:
      return state;
  }
};
  
export default user;
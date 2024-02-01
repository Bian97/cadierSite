import axios from 'axios';
import { URLAPI } from "../constants/Constants";

export const LOGIN = "LOGIN";
export const LOGINSEMCONTA = "LOGINSEMCONTA";
export const LOGOUT = "LOGOUT";

export const loginUser = (documento, numero, atendente, dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(`${URLAPI}autenticacao/login`, {
          documento,
          numero,
          atendente,
      });

      dispatch({ type: LOGIN, payload: response.data });
      resolve(response.data);
    } catch (error) 
    {
      console.error("Erro ao fazer login:", error);
      reject(error);
    }
  });
};

export const loginSemContaUser = (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {      
      dispatch({ type: LOGINSEMCONTA, payload: { estaLogado: true, possuiConta: false } });
      resolve({ estaLogado: true, possuiConta: false });
    } catch (error) 
    {
      console.error("Erro ao fazer login:", error);
      reject(error);
    }
  });
};

export const logOut = (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {      
      dispatch({ type: LOGOUT });
      //resolve({ estaLogado: true, possuiConta: false });
    } catch (error) 
    {
      console.error("Erro ao fazer logout:", error);
      reject(error);
    }
  });
};
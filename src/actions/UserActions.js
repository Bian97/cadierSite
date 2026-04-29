import axios from 'axios';
import { URLAPI } from "../constants/Constants";

export const LOGIN = "LOGIN";
export const LOGINSEMCONTA = "LOGINSEMCONTA";
export const LOGOUT = "LOGOUT";
const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

export const loginUser = (documento, numero, atendente, dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(`${API_URL}/autenticacao/login`, {
          documento,
          numero,
          atendente,
      },
      {
        headers: {
          "x-api-key": API_KEY,
        },
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

export const logOut = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};
import axios from 'axios';
import { URLAPI } from "../constants/Constants";

export const LOGIN = "LOGIN";
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
      reject(error);
    }
  });
};
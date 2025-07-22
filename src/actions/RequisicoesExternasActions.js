import axios from 'axios';
import { URLAPI } from "../constants/Constants";

export const fetchEnderecoViaCep = (token, cep) => async dispatch => {
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios.get(`${URLAPI}ConsultaExterna/consultar-endereco-por-cep/${cep}`, config);    

    dispatch({
      type: 'FETCH_VIA_CEP_SUCCESS',
      payload: response.data
    });
    return response.data;

  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    dispatch({
      type: 'FETCH_VIA_CEP_DATA_FAILURE',
      payload: error
    });
  }
};
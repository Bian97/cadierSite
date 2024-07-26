import axios from 'axios';
import { URLAPI } from "../constants/Constants";

export const getFiliados = async (filters, token) => {
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: filters
    };

    const response = await axios.get(`${URLAPI}PessoaFisica/GetPFisicas`, config);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error;
  }
};

export const fetchFiliadoDataById = (token, id) => async dispatch => {
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios.get(`${URLAPI}PessoaFisica/Detalhes/${id}`, config);    

    dispatch({
      type: 'FETCH_FILIADO_DATA_SUCCESS',
      payload: response.data
    });
    return response.data;

  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    dispatch({
      type: 'FETCH_FILIADO_DATA_FAILURE',
      payload: error
    });
  }
};
import axios from 'axios';
import { URLAPI } from "../constants/Constants";
import { showErro, showSucesso } from '../components/util/Notificacao';

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

export const updateUserData = (data, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios.patch(`${URLAPI}PessoaFisica`, data, config);

    if (response.status === 200) 
    {
      dispatch({
        type: 'UPDATE_USER_DATA',
        payload: response.data, // Dados atualizados retornados pela API
      });

      return response.data;
    }
    
  } catch (error) {
    console.error("Erro ao salvar os dados: ", error);
    // showErro('Erro ao salvar os dados. Verifique a conexão e tente novamente.');
  }
};

export const createUserData = (data, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios.post(`${URLAPI}PessoaFisica`, data, config);

    if (response.status === 200) 
    {
      dispatch({
        type: 'CREATE_USER_DATA',
        payload: response.data,
      });
      showSucesso('Dados criados com sucesso!');
      return response.data;
    }
  } catch (error) {
    console.error("Erro ao salvar os dados: ", error);
    // showErro('Erro ao salvar os dados. Verifique a conexão e tente novamente.');
  }
};
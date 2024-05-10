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
    console.log('Dados recebidos:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error;
  }
};

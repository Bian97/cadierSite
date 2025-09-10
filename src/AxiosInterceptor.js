import axios from 'axios';
import { logOut } from './actions/UserActions';
import i18n from './i18n';
const { showErro } = require('../src/services/NotificacaoService');

export default store => {  

  // Interceptor de request: adiciona Accept-Language
  axios.interceptors.request.use(
    config => {
      const culture = localStorage.getItem("i18nextLng") || "pt_BR";
      config.headers['Accept-Language'] = culture;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  // Interceptor de response: tratamento de erros
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        store.dispatch(logOut());
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }

      if (error.response && error.response.status === 400) {
        showErro(i18n.t(`textosValidacao.${error.response.data.erro}`));
      }

      return Promise.reject(error);
    }
  );
};

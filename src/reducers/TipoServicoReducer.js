const initialState = {
  tipoServico: {},
  error: null
};
  
const tipoServicoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TIPO_SERVICO_DATA_SUCCESS':
      return {
        ...state,
        filiadoData: action.payload,
        error: null
      };
    case 'FETCH_TIPO_SERVICO_DATA_FAILURE':
      return {
        ...state,
        error: action.payload
      };
    case 'UPDATE_TIPO_SERVICO_DATA':
      return {
        ...state,
        tipoServico: {
          ...state.tipoServico,
          ...action.payload
        },
        error: null
      };
    default:
      return state;
  }
};

export default tipoServicoReducer;
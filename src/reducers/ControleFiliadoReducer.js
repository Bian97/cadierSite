const initialState = {
  filiadoData: {},
  error: null
};
  
const filiadoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_FILIADO_DATA_SUCCESS':
      return {
        ...state,
        filiadoData: action.payload,
        error: null
      };
    case 'FETCH_FILIADO_DATA_FAILURE':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default filiadoReducer;
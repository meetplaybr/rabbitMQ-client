import { GET_PRODUCTS, GET_PRODUCTS_STREAM, PRODUCTS_REACTION } from '../../actions/products';

export const appReducer = (state: any, action: any) => {
  
  switch (action.type) {
    case GET_PRODUCTS:
      const { data, error } = action.payload;
      return { ...state, products: data, isLoading: false, isError: error };
    case GET_PRODUCTS_STREAM:
      return { ...state, products: [action.payload, ...state.products] };
    case PRODUCTS_REACTION:
      const products = state.products.map((p: any) =>{
          p._id === action.payload.id
            ? { ...p, inventoryStatus: [...action.payload.inventoryStatus] }
            : p
        }
      );
      return { ...state, products };
    default:
      return state;
  }
};
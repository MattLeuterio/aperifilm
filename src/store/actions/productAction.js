import { 
    GET_PRODUCT_DETAILS, 
    PRODUCT_ERROR 
} from '../types';
import axios from 'axios';
import { tmdbApiKey } from '../../js/utility';

export const getProductDetails = (productType, id, lang) => async dispatch => {
  try{
      const res = await axios.get(`https://api.themoviedb.org/3/${productType}/${id}?api_key=${tmdbApiKey}&language=${lang === 'it' ? 'it-IT' : 'en-En'}`);

      dispatch({
          type: GET_PRODUCT_DETAILS,
          payload: res.data
      })
  }
  catch(error){
      dispatch( {
          type: PRODUCT_ERROR,
          payload: error,
      })
  }
};
'use client';
import { toast } from 'react-toastify';
import { ssEvents } from '../../../service/axios';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { appReducer } from '../../reducer/product';
import cuid from 'cuid';
import { getProducts } from '../../../service/produtos/product.services';
import { GET_PRODUCTS, GET_PRODUCTS_STREAM, PRODUCTS_REACTION } from '../../actions/products';

const initialState = {
  userId: cuid(),
  product: [],
  isLoading: true,
  isError: false,
};

export const AppContext = createContext(initialState);

const AppProvider = (props) => {
  const [appState, appDispatch] = useReducer(appReducer, initialState);
  const { userId } = appState;
  
  useEffect(() => {
    // fetch initial products
    const getFetchProducts = async () => {
      const res = await getProducts();
      appDispatch({ type: GET_PRODUCTS, payload: res });
    };
    getFetchProducts();

    // listen to message event
    ssEvents.addEventListener("message", (e) => {
      console.log(e)
    });

    // listen to products event
    ssEvents.addEventListener("product", (e) => {
      const data = JSON.parse(e.data);
      console.log(e)
      if (userId !== data.userId) {
        toast("New incoming product", {
          position: "bottom-right",
          autoClose: 1000,
          draggable: true,
          pauseOnHover: true,
          progress: undefined,
          hideProgressBar: false,
        });
      }
      setTimeout(() => {
        appDispatch({ type: GET_PRODUCTS_STREAM, payload: data });
      }, 500);
    });

    // listen to product event
    ssEvents.addEventListener("product_reaction", (e) => {
      const { status, product } = JSON.parse(e.data);
      if (status !== userId) {
        const message =
          product.userId === userId
            ? "Someone reacted to your product"
            : "New product reaction";
        toast(message, {
          position: "bottom-right",
          autoClose: 1000,
          draggable: true,
          pauseOnHover: true,
          progress: undefined,
          hideProgressBar: false,
        });
        appDispatch({
          type: PRODUCTS_REACTION,
          payload: { id: product._id, status: product.status },
        });
      }
    });

    // listen to notification event
    ssEvents.addEventListener(`notification-${userId}`, (e) => {
      const data = JSON.parse(e.data);
      toast(data.title, {
        position: "top-right",
        autoClose: 1000,
        draggable: true,
        pauseOnHover: true,
        progress: undefined,
        hideProgressBar: false,
      });
    });

    // listen to open event
    ssEvents.onopen = (e) => {
      console.log(e);
    };
    // listen to error event
    ssEvents.onerror = (e) => {
      console.log(e);
    };
    // }

    return () => {
      ssEvents.close();
    };
  }, [userId]);

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      {props.children}
    </AppContext.Provider>
  )
};


export const useAppContext = () => useContext(AppContext);
export default AppProvider;
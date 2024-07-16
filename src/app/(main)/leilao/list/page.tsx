'use client';

import React, { useState, useEffect, useRef, useContext, useReducer } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { ProductService } from '../../../../demo/service/ProductService';
import { InputText } from 'primereact/inputtext';
import type { Demo } from '../../../../types/types';
import CarouselApp from '../../components/carousel';
import style from './style.module.scss'
import { Menu } from 'primereact/menu';
import { AppContext, useAppContext } from '../../context/product';
import { appReducer } from '../../reducer/product';
import { GET_PRODUCTS, GET_PRODUCTS_STREAM, PRODUCTS_REACTION } from '../../actions/products';
import { getProducts } from '../../../service/produtos/product.services';
import { Toast } from 'primereact/toast';
const initialState = {
    userId: 0,
    product: [],
    isLoading: true,
    isError: false,
  };
const ListDemo = () => {
    const menu1 = useRef<Menu>(null);
    const menu2 = useRef<Menu>(null);
    const toast = useRef<Toast>(null);
    const [dataViewValue, setDataViewValue] = useState<Demo.Product[]>([]);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filteredValue, setFilteredValue] = useState<Demo.Product[] | null>(null);    
    const [layout, setLayout] = useState<'grid' | 'list' | (string & Record<string, unknown>)>('grid');

    const [products, setProducts] = useState<Demo.Product[]>([]);
    const [appState, appDispatch] = useReducer(appReducer, initialState);
    const { userId } = appState;
    useEffect(() => {
        const ssEvents = new EventSource("http://localhost:5000/stream", { withCredentials: true });        
        const getFetchProducts = async () => {
            const res = await getProducts();
            setDataViewValue(res.data)
            appDispatch({ type: GET_PRODUCTS, payload: res });
        };
        getFetchProducts()

        // listen to message event
        ssEvents.addEventListener("message", (e) => { });

        // listen to products event
        ssEvents.addEventListener("product", (e) => {
            const data = JSON.parse(e.data);
            console.log(data)
            getFetchProducts()
            toast.current?.show({
                severity: 'success',
                summary: 'Success Message',
                detail: 'Message Detail',
                life: 3000
            });
        });
        // listen to product event
        ssEvents.addEventListener("product_reaction", (e) => {
            const { status, product } = JSON.parse(e.data);
            if (product.userId !== userId) {
                console.log(product, userId)
                console.log("Aqui")
                const message =
                product.userId === userId
                    ? "Alguém reagiu ao seu produto"
                    : "Reação ao novo produto";
                toast.current?.show({
                    severity: 'success',
                    summary: 'Success Message',
                    detail: message,
                    life: 3000
                })
                appDispatch({
                type: PRODUCTS_REACTION,
                payload: { id: product._id, inventoryStatus: product.inventoryStatus },
                });
                getFetchProducts()
            }
        });

        // listen to notification event
        ssEvents.addEventListener(`notification-${userId}`, (e) => {
            const data = JSON.parse(e.data);
            toast.current?.show({
                severity: 'success',
                summary: 'Success Message',
                detail: 'Message Detail',
                life: 3000
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

        
        //ProductService.getProducts().then((data) => setDataViewValue(data));
        setGlobalFilterValue('');
        ProductService.getProductsSmall().then((products) => setProducts(products));
        return () => {
            ssEvents.close();
          };
    }, [userId]);

    const onFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        if (value.length === 0) {
            setFilteredValue(null);
        } else {
            const filtered = dataViewValue?.filter((product) => {
                const productNameLowercase = product.name.toLowerCase();
                const searchValueLowercase = value.toLowerCase();
                return productNameLowercase.includes(searchValueLowercase);
            });

            setFilteredValue(filtered);
        }
    };

    const dataViewHeader = (
        <div className="flex justify-content-between">
          <span className="p-input-icon-right">
            <InputText value={globalFilterValue} onChange={onFilter} placeholder="Digite o produto" />
            <i className="pi pi-search" />
          </span>
        </div>
    );
    
    const formatCurrency = (value: number | undefined) => {
        return value?.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
        });
    };

    const verificaTag = (tag: StatusProduto) =>{
      if(tag === 'INSTOCK'){
        return 'DISPONÍVEL'
      } else if(tag === 'LOWSTOCK'){
        return 'EM NEGOCIAÇÂO'
      }else {
        return 'VENDIDO'
      }
    }

    const dataviewGridItem = (data: Leilao.Produto) => {
        return (
            <div className="col-12 lg:col-4">
                <Toast ref={toast} />
                <div className={style.card_custon +" m-3 border-1 surface-border"}>
                    <div className="flex flex-wrap gap-2 align-items-center justify-content-between mb-2">
                        {
                            data.inventoryStatus ===  'LOWSTOCK' ? 
                            <div className="flex align-items-center justify-content-center bg-indigo-100 border-round "style={{ width: '2.5rem', height: '2.5rem' }}>
                                <span className='text-indigo-500 text-xl'>5</span>
                            </div> : <div className="flex align-items-center">
                                <i className="pi pi-tag mr-2" />
                                <span className="font-semibold">{data.category}</span>
                            </div>
                        }
                        
                        
                        <span className={`product-badge status-${data.inventoryStatus?.toLowerCase()}`}>{verificaTag(data.inventoryStatus)}</span>
                    </div>
                    <div className="flex flex-column align-items-center text-center mb-3">
                        <CarouselApp itens={products}></CarouselApp>
                        <div className="text-2xl font-bold">{ formatCurrency(data.price)}</div>
                        <div className="mb-3">{data.name}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <Button label={"COMPRAR"} rounded outlined disabled={data.inventoryStatus === 'OUTOFSTOCK' || data.inventoryStatus === 'LOWSTOCK'}/>
                       
                        <Button label={"+ R$ 5,00"} rounded disabled={data.inventoryStatus === 'OUTOFSTOCK' || data.inventoryStatus === 'INSTOCK'} />
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (data: Demo.Product, layout: 'grid' | 'list' | (string & Record<string, unknown>)) => {
        if (!data) {
            return;
        }
        return dataviewGridItem(data);
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <DataView value={filteredValue || dataViewValue} layout="grid" paginator rows={9} itemTemplate={itemTemplate} header={dataViewHeader}></DataView>
                </div>
            </div>
        </div>
    );
};

export default ListDemo;

type StatusProduto = 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK' | undefined;
declare namespace Leilao {
  type Produto = {
    id?: string;
    code?: string;
    name: string;
    description: string;
    images?: string[];
    price?: number;
    category?: string;
    quantity?: number;
    inventoryStatus?: InventoryStatus;
    rating?: number;
    orders?: ProductOrder[];
    [key: string]: string | string[] | number | boolean | undefined | ProductOrder[] | InventoryStatus;
  };
}
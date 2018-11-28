//@flow
export type ListItem = {
    name: string,
    id: number,
    selected: boolean,
    active: boolean,
    productsids?: number[]
};

export type ProductItem = {
    name: string,
    id: number,
    selected: boolean,
    active: boolean
};

export type ShopItem = {
    name: string,
    id: number,
    selected: boolean,
    active: boolean,
    productsids: number[]
}

export type Action = (payload?: any) => Object;
export type Lists = { shops: ShopItem[], products: ProductItem[] };

//@flow

export type Item = {
    _id: string,
    listName: string,
    date: number
};


export type SavedList = {
    current: number,
    error: string,
    listsArr: Item[],
    pages: number,
    sort: string,
    success: string
};




export type List = {
    userId: string,
    listName: string,
    list: { shops: number[], products: number[] },
    date: number
};

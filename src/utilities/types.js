//@flow
export type Constant = {
    request: string,
    success: string,
    error: string
};

export type Action = {
    type: string,
    payload?: any
};

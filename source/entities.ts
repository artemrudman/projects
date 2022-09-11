export interface store {
    id: number;
    store_name: string;
}

export interface systemError {
    code: number;
    message: string;
}

export interface sqlParameter {
    name: string;
    type: any;
    value: string | number;
}
import { IProduct } from "./product";

export interface IPagination {
    currentPage:number;
    pageSize: number;
    totalCount:number;
    totalPage:number
    data : IProduct[];
}

export class Pagination implements IPagination {
    currentPage!: number; 
    pageSize!: number;
    totalCount!: number;
    totalPage!: number;
    data: IProduct[] = []
}
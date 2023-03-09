export interface BasicPageParams {
  pageNum: number;
  pageSize: number;
}

export interface BasicPageByLastIdParams {
  lastMinId: number | string | null;
  limit: number;
}

export interface BasicFetchResult<T> {
  payload: T[];
  totalCount?: number;
  message: string;
  code: number;
}

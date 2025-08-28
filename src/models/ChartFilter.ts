export interface ChartFilterRequest {
  fromDate: Date;
  toDate: Date;
  category?: string;
}

export interface ChartFilterResponse {
  month: string;
  income: number;
  expense: number;
  net: number;
  [key: string]: string | number; //chart library asks for a dynamic key
}

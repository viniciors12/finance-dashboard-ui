import dayjs from "dayjs";

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
  savings: number;
  [key: string]: string | number; //chart library asks for a dynamic key
}

export const chartFilterInitialState: ChartFilterRequest = {
  fromDate: dayjs().startOf("month").toDate(),
  toDate: dayjs().endOf("month").toDate(),
  category: "All",
};

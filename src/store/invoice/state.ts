export interface InvoiceStateInterface {
  etaDays: number;
  enDate: string;
  esDate: string;
  percent: number;
  querySuccess: boolean;
}

export interface InvoiceResponse {
  enDate: string;
  esDate: string;
  percent: number;
  querySuccess: boolean;
}

function state(): InvoiceStateInterface {
  return {
    etaDays: -1,
    percent: 0,
    enDate: '',
    esDate: '',
    querySuccess: false,
  };
}

export default state;

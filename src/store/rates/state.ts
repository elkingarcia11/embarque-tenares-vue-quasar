import { DocumentData } from 'firebase/firestore';

export interface RatesStateInterface {
  ratesList: DocumentData[];
  listOfLists: DocumentData[][];
}

function state(): RatesStateInterface {
  return {
    ratesList: [],
    listOfLists: [],
  };
}

export default state;

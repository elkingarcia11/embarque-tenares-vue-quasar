import { DocumentData } from 'firebase/firestore';

export interface FaqsStateInterface {
  faqsList: DocumentData[];
}

function state(): FaqsStateInterface {
  return {
    faqsList: [],
  };
}

export default state;

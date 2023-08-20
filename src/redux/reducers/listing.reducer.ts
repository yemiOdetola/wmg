import * as Types from '../actions/types';

const initialState: any = {
  myListing: null,
  rankedItems: null,
  listingsResult: null,
  myPrediction: null,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case Types.MY_REQUESTS:
      return {
        ...state,
        myListing: action?.data,
      };
    case Types.REQUESTS_AHP:
      return {
        ...state,
        listingsResult: action?.cranked,
        rankedItems: action?.rankedItems,
      };
    case Types.MY_PREDICTION:
      return {
        ...state,
        myPrediction: action?.data,
      };
    default: {
      return {
        ...state,
      };
    }
  }
}

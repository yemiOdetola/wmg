import * as Types from '../actions/types';

const initialState: any = {
  myListing: null,
  rankedItems: null,
  listingsResult: null,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case Types.MY_REQUESTS:
      return {
        ...state,
        myListing: action?.data,
      };
    case Types.REQUESTS_AHP:
      console.log('action?.data?.cranked: ', action?.data?.cranked);
      return {
        ...state,
        listingsResult: action?.cranked,
        rankedItems: action?.rankedItems,
      };
    default: {
      return {
        ...state,
      };
    }
  }
}

import * as Types from '../actions/types';

const initialState: any = {
  myListing: null,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case Types.MY_REQUESTS:
      return {
        ...state,
        myListing: action?.data,
      };
    default: {
      return {
        ...state,
      };
    }
  }
}

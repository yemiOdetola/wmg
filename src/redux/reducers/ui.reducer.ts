import * as Types from '../actions/types';

const initialState = {
  loading: false,
};

export default function uireducer(state = initialState, action: any) {
  switch (action.type) {
    case Types.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default: {
      return {
        ...state,
      };
    }
  }
}

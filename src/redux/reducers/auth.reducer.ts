import * as Types from '../actions/types';

const initialState: any = {
  token: '',
  user: {},
  dummyUser: {},
  otp_id: '',
  profile: {},
  newUser: null,
  sellerInfo: null,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case Types.AUTH:
      return {
        ...state,
        user: action?.user,
        token: action?.token,
      };
    case Types.DUMMY_USER:
      return {
        ...state,
        dummyUser: action?.payload,
      };
    case Types.SELLERINFO:
      console.log('act payload', action?.user);
      return {
        ...state,
        sellerInfo: action?.user,
      };
    default: {
      return {
        ...state,
      };
    }
  }
}

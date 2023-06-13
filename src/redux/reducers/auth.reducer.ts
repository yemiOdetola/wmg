import * as Types from '../actions/types';

const initialState: any = {
  token: '',
  user: {},
  dummyUser: {},
  otp_id: '',
  profile: {},
  newUser: null,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case Types.AUTH:
      return {
        ...state,
        user: action?.user,
        profile: action?.profile,
        token: action?.token,
      };
    case Types.DUMMY_USER:
      return {
        ...state,
        dummyUser: action?.payload,
      };
    default: {
      return {
        ...state,
      };
    }
  }
}

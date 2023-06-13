import * as Types from './types';

export const Loading = (state: any) => {
  return (dispatch: any) => {
    dispatch({
      type: Types.LOADING,
      payload: state,
    });
  };
};

import * as types from "../types";

export const actionMiniappBase = (data: any) => {
  return {
    type: types.MINIAPP_BASE,
    payload: data,
  };
};

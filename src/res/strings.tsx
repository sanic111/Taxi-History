/**
 * @flow
 */

import { _global } from "../global";
import en from "./language/en";
import vi from "./language/vi";

const strings = () => {
  try {
    // if (_global.appInfo.language.toLocaleLowerCase() == "vi") {
    return vi;
    // } else {
    //   return en;
    // }
  } catch (error) {
    return vi;
  }
};
export default strings;

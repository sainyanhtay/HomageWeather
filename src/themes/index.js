import ColorCodes from './Colors';
import Metrics from './Metrics';
import Images from './Images';
import ApplicationStyles from './ApplicationStyles';

export {Metrics, ApplicationStyles, Images};

// export as a json file to change dynamically in release mode
export const Colors = {
  ...ColorCodes,
};

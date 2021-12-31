import ColorCodes from './Colors';
import Metrics from './Metrics';
import ApplicationStyles from './ApplicationStyles';

export {Metrics, ApplicationStyles};

// export as a json file to change dynamically in release mode
export const Colors = {
  ...ColorCodes,
};

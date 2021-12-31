import {createLogger} from 'redux-logger';

const level = 'info';

export default createLogger({
  level,
  diff: true,
  collapsed: (getState, action, logEntry) => !logEntry.error,
  stateTransformer: (state) => state,
});

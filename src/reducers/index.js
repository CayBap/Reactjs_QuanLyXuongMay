/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';

import user from './user';
import cate from './cate';
import product from './product';
import importProduct from './importProduct';
import exportProduct from './exportProduct';
import delivery from './delivery';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    user,
      cate,
      product,
      importProduct,
      exportProduct,
      delivery,
    ...injectedReducers,
  });

  // Wrap the root reducer and return a new root reducer with router state
  return rootReducer}

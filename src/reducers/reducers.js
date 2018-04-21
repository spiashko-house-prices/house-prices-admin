import {combineReducers} from 'redux';
import {
  ADD_TO_BASE_FEATURES,
  ADD_TO_TO_BOOLEAN_TRANSFORM,
  ADD_TO_TO_LOG_TRANSFORM,
  ADD_TO_TO_POW_TRANSFORM,
  ADD_TRAIN_METHOD,
  ALL_FEATURES_LOADED,
  ALL_FEATURES_LOADING,
  CHANGE_SELECTED_BASE_FEATURE,
  CHANGE_SELECTED_TO_BOOLEAN_TRANSFORM,
  CHANGE_SELECTED_TO_LOG_TRANSFORM,
  CHANGE_SELECTED_TO_POW_TRANSFORM,
  CHANGE_SELECTED_TRAIN_METHOD,
  CHANGE_SELECTED_TRAIN_VALUE,
  LOAD_ERRORS,
  LOAD_METHODS,
  REMOVE_FROM_BASE_FEATURES,
  REMOVE_FROM_TO_BOOLEAN_TRANSFORM,
  REMOVE_FROM_TO_LOG_TRANSFORM,
  REMOVE_FROM_TO_POW_TRANSFORM,
  REMOVE_TRAIN_METHOD,
} from '../actions/actions';

function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

const defLoadState = {
  status: 'empty',
};

function loadReducer(state = defLoadState, action) {
  switch (action.type) {
    case ALL_FEATURES_LOADING:
      return {...state, status: 'loading'};
    case ALL_FEATURES_LOADED:
      return {
        ...state,
        features: action.features,
        status: 'loaded',
      };
    default:
      return state;
  }
}

const defFeatures = {
  features: [],
  baseFeatures: [],
  selectedBaseFeature: '',
  availableForPowTransform: [],
  availableForLogTransform: [],
  availableForBooleanTransform: [],
  toPowTransform: [],
  toLogTransform: [],
  toBooleanTransform: [],
  selectedToPowTransform: '',
  selectedToLogTransform: '',
  selectedToBooleanTransform: '',
};

function featuresReducer(state = defFeatures, action) {
  let index;
  switch (action.type) {
    case ALL_FEATURES_LOADED:
      return {
        ...state,
        features: action.features.slice(0),
        availableForBooleanTransform: action.features.slice(0),
        selectedToBooleanTransform: action.features[0],
        selectedBaseFeature: action.features[0],
      };
    case ADD_TO_BASE_FEATURES:
      index = state.features.indexOf(state.selectedBaseFeature);

      if (index < 0) {
        return {
          ...state,
        };
      }

      state.availableForPowTransform.push(state.selectedBaseFeature);
      state.availableForLogTransform.push(state.selectedBaseFeature);

      state.baseFeatures.push(state.selectedBaseFeature);
      state.features.splice(index, 1);
      return {
        ...state,
        selectedBaseFeature: state.features[0],
        selectedToPowTransform: state.availableForPowTransform[0],
        selectedToLogTransform: state.availableForLogTransform[0],
      };
    case CHANGE_SELECTED_BASE_FEATURE:
      return {
        ...state,
        selectedBaseFeature: action.featureName,
      };
    case REMOVE_FROM_BASE_FEATURES:
      index = state.baseFeatures.indexOf(action.featureName);

      if (index < 0) {
        return {
          ...state,
        };
      }

      state.baseFeatures.splice(index, 1);
      state.features.push(action.featureName);

      index = state.toPowTransform.indexOf(action.featureName);
      if (index > -1) {
        state.toPowTransform.splice(index, 1);
      }
      index = state.toLogTransform.indexOf(action.featureName);
      if (index > -1) {
        state.toLogTransform.splice(index, 1);
      }

      index = state.availableForPowTransform.indexOf(action.featureName);
      if (index > -1) {
        state.availableForPowTransform.splice(index, 1);
      }
      index = state.availableForLogTransform.indexOf(action.featureName);
      if (index > -1) {
        state.availableForLogTransform.splice(index, 1);
      }

      return {
        ...state, selectedBaseFeature: action.featureName,
      };
    case ADD_TO_TO_POW_TRANSFORM:
      index = state.availableForPowTransform.indexOf(
          state.selectedToPowTransform);

      if (index < 0) {
        return {
          ...state,
        };
      }

      state.toPowTransform.push(state.selectedToPowTransform);
      state.availableForPowTransform.splice(index, 1);
      return {
        ...state, selectedToPowTransform: state.availableForPowTransform[0],
      };
    case CHANGE_SELECTED_TO_POW_TRANSFORM:
      return {
        ...state, selectedToPowTransform: action.featureName,
      };
    case REMOVE_FROM_TO_POW_TRANSFORM:
      index = state.toPowTransform.indexOf(action.featureName);
      state.toPowTransform.splice(index, 1);
      state.availableForPowTransform.push(action.featureName);
      return {
        ...state, selectedToPowTransform: action.featureName,
      };
    case ADD_TO_TO_LOG_TRANSFORM:
      index = state.availableForLogTransform.indexOf(
          state.selectedToLogTransform);

      if (index < 0) {
        return {
          ...state,
        };
      }

      state.toLogTransform.push(state.selectedToLogTransform);
      state.availableForLogTransform.splice(index, 1);
      return {
        ...state, selectedToLogTransform: state.availableForLogTransform[0],
      };
    case CHANGE_SELECTED_TO_LOG_TRANSFORM:
      return {
        ...state, selectedToLogTransform: action.featureName,
      };
    case REMOVE_FROM_TO_LOG_TRANSFORM:
      index = state.toLogTransform.indexOf(action.featureName);
      state.toLogTransform.splice(index, 1);
      state.availableForLogTransform.push(action.featureName);
      return {
        ...state, selectedToLogTransform: action.featureName,
      };
    case ADD_TO_TO_BOOLEAN_TRANSFORM:
      index = state.availableForBooleanTransform.indexOf(
          state.selectedToBooleanTransform);

      if (index < 0) {
        return {
          ...state,
        };
      }

      if (state.toBooleanTransform.map(o =>
          o.newFeatureName).indexOf(action.newFeatureName) > -1) {
        return {
          ...state,
        };
      }

      state.availableForBooleanTransform.splice(index, 1);

      state.toBooleanTransform.push({
        featureName: state.selectedToBooleanTransform,
        newFeatureName: action.newFeatureName,
        threshold: action.threshold,
      });
      return {
        ...state,
        selectedToBooleanTransform: state.availableForBooleanTransform[0],
      };
    case CHANGE_SELECTED_TO_BOOLEAN_TRANSFORM:
      return {
        ...state, selectedToBooleanTransform: action.featureName,
      };
    case REMOVE_FROM_TO_BOOLEAN_TRANSFORM:
      index = state.toBooleanTransform.map(o =>
          o.featureName).indexOf(action.featureName);
      state.toBooleanTransform.splice(index, 1);
      state.availableForBooleanTransform.push(action.featureName);
      return {
        ...state,
        selectedToBooleanTransform: action.featureName,
      };
    default:
      return state;
  }
}

const defLoadPredictionState = {
  errors: null,
};

function loadErrorsReducer(state = defLoadPredictionState, action) {
  switch (action.type) {
    case LOAD_ERRORS:
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
}

const defMethodsState = {
  availableMethods: [],
  usedMethods: [],
  selectedMethod: '',
  remainingPercentages: 1,
  selectedValue: 1,
};

function methodsReducer(state = defMethodsState, action) {
  let index;
  switch (action.type) {
    case LOAD_METHODS:
      return {
        ...state,
        availableMethods: action.availableMethods,
        selectedMethod: action.availableMethods[0],
      };
    case ADD_TRAIN_METHOD:

      if (state.selectedValue === 0) {
        return {
          ...state,
        };
      }

      index = state.availableMethods.indexOf(state.selectedMethod);
      if (index < 0) {
        return {
          ...state,
        };
      }

      state.usedMethods.push({
        name: state.selectedMethod,
        value: state.selectedValue,
      });
      state.availableMethods.splice(index, 1);
      return {
        ...state,
        selectedMethod: state.availableMethods[0],
        remainingPercentages: round(
            (state.remainingPercentages - state.selectedValue), 2),
        selectedValue: round((state.remainingPercentages - state.selectedValue),
            2),
      };
    case CHANGE_SELECTED_TRAIN_METHOD:
      return {
        ...state, selectedMethod: action.name,
      };
    case CHANGE_SELECTED_TRAIN_VALUE:
      return {
        ...state, selectedValue: action.value,
      };
    case REMOVE_TRAIN_METHOD:
      index = state.usedMethods.map(o => o.name).indexOf(action.name);
      let vacantPercentages = state.usedMethods[index].value;
      state.usedMethods.splice(index, 1);
      state.availableMethods.push(action.name);
      return {
        ...state,
        selectedMethod: action.name,
        remainingPercentages: round(
            (state.remainingPercentages + vacantPercentages), 2),
        selectedValue: round((state.remainingPercentages + vacantPercentages),
            2),
      };
    default:
      return state;
  }
}

const housePricesAdminApp = combineReducers({
  loadReducer,
  featuresReducer,
  loadErrorsReducer,
  methodsReducer,
});

export default housePricesAdminApp;
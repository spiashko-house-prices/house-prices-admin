import {combineReducers} from 'redux';
import {
  ADD_TO_BASE_FEATURES,
  ADD_TO_TO_BOOLEAN_TRANSFORM,
  ADD_TO_TO_LOG_TRANSFORM,
  ADD_TO_TO_POW_TRANSFORM,
  ADD_TRAIN_METHOD,
  ALL_FEATURES_LOADED,
  ALL_FEATURES_LOADING,
  CHANGE_DATASET,
  CHANGE_SELECTED_BASE_FEATURE,
  CHANGE_SELECTED_TO_BOOLEAN_TRANSFORM,
  CHANGE_SELECTED_TO_LOG_TRANSFORM,
  CHANGE_SELECTED_TO_POW_TRANSFORM,
  CHANGE_SELECTED_TRAIN_METHOD,
  CHANGE_SELECTED_TRAIN_VALUE,
  LOAD_ADMIN_MODEL,
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

const amesDataset = {
  backend: process.env.REACT_APP_AMES_BACKEND,
  username: process.env.REACT_APP_AMES_USERNAME,
  password: process.env.REACT_APP_AMES_PASSWORD,
};

const kcDataset = {
  backend: process.env.REACT_APP_KC_BACKEND,
  username: process.env.REACT_APP_KC_USERNAME,
  password: process.env.REACT_APP_KC_PASSWORD,
};

const defDataset = {
  dataset: amesDataset,
};

function datasetReducer(state = defDataset, action) {
  switch (action.type) {
    case CHANGE_DATASET:
      switch (action.datasetName) {
        case 'ames':
          return {...state, dataset: amesDataset};
        case 'kc':
          return {...state, dataset: kcDataset};
        default:
          return {...state, dataset: amesDataset};
      }
    default:
      return state;
  }
}

const defLoadState = {
  status: 'loading',
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
    case LOAD_ADMIN_MODEL:

      let features = state.features.filter(
          feature => !action.adminModel.baseFeatures.includes(feature));
      let availableForPowTransform = action.adminModel.baseFeatures.filter(
          feature => !action.adminModel.toPowTransform.includes(feature));
      let availableForLogTransform = action.adminModel.baseFeatures.filter(
          feature => !action.adminModel.toLogTransform.includes(feature));
      let availableForBooleanTransform = state.features.filter(
          feature => !action.adminModel.toBooleanTransform.map(
              o => o.featureName).includes(feature));

      return {
        ...state,
        baseFeatures: action.adminModel.baseFeatures,
        toBooleanTransform: action.adminModel.toBooleanTransform,
        toLogTransform: action.adminModel.toLogTransform,
        toPowTransform: action.adminModel.toPowTransform,
        selectedBaseFeature: features[0],
        selectedToPowTransform: availableForPowTransform[0],
        selectedToLogTransform: availableForLogTransform[0],
        selectedToBooleanTransform: availableForBooleanTransform[0],
        features: features,
        availableForPowTransform: availableForPowTransform,
        availableForLogTransform: availableForLogTransform,
        availableForBooleanTransform: availableForBooleanTransform,
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
        baseFeatures: state.baseFeatures.slice(0),
        features: state.features.slice(0),
        availableForPowTransform: state.availableForPowTransform.slice(0),
        availableForLogTransform: state.availableForLogTransform.slice(0),
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
        ...state,
        baseFeatures: state.baseFeatures.slice(0),
        features: state.features.slice(0),
        availableForPowTransform: state.availableForPowTransform.slice(0),
        availableForLogTransform: state.availableForLogTransform.slice(0),
        toPowTransform: state.toPowTransform.slice(0),
        toLogTransform: state.toLogTransform.slice(0),
        selectedBaseFeature: action.featureName,
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
        ...state,
        availableForPowTransform: state.availableForPowTransform.slice(0),
        toPowTransform: state.toPowTransform.slice(0),
        selectedToPowTransform: state.availableForPowTransform[0],
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
        ...state,
        availableForPowTransform: state.availableForPowTransform.slice(0),
        toPowTransform: state.toPowTransform.slice(0),
        selectedToPowTransform: action.featureName,
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
        ...state,
        availableForLogTransform: state.availableForLogTransform.slice(0),
        toLogTransform: state.toLogTransform.slice(0),
        selectedToLogTransform: state.availableForLogTransform[0],
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
        ...state,
        availableForLogTransform: state.availableForLogTransform.slice(0),
        toLogTransform: state.toLogTransform.slice(0),
        selectedToLogTransform: action.featureName,
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
        availableForBooleanTransform: state.availableForBooleanTransform.slice(
            0),
        toBooleanTransform: state.toBooleanTransform.slice(0),
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
        availableForBooleanTransform: state.availableForBooleanTransform.slice(
            0),
        toBooleanTransform: state.toBooleanTransform.slice(0),
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
    case LOAD_ADMIN_MODEL:
      return {
        ...state,
        errors: null,
      };
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
    case LOAD_ADMIN_MODEL:

      let availableMethods = state.availableMethods.filter(
          feature => !action.adminModel.methods.map(o => o.name).
              includes(feature));
      let usedPercentages = action.adminModel.methods.map(o => o.value).
          reduce((prev, curr) => prev + curr);

      return {
        ...state,
        usedMethods: action.adminModel.methods,
        availableMethods: availableMethods,
        selectedMethod: availableMethods[0],
        remainingPercentages: 1 - usedPercentages,
        selectedValue: 1 - usedPercentages,
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
        usedMethods: state.usedMethods.slice(0),
        availableMethods: state.availableMethods.slice(0),
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
        usedMethods: state.usedMethods.slice(0),
        availableMethods: state.availableMethods.slice(0),
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
  datasetReducer,
  loadReducer,
  featuresReducer,
  loadErrorsReducer,
  methodsReducer,
});

export default housePricesAdminApp;
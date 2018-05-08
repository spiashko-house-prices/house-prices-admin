export const ALL_FEATURES_LOADING = 'ALL_FEATURES_LOADING';
export const ALL_FEATURES_LOADED = 'ALL_FEATURES_LOADED';
export const LOAD_METHODS = 'LOAD_METHODS';
export const LOAD_ADMIN_MODEL = 'LOAD_ADMIN_MODEL';
export const ADD_TO_BASE_FEATURES = 'ADD_TO_BASE_FEATURES';
export const CHANGE_SELECTED_BASE_FEATURE = 'CHANGE_SELECTED_BASE_FEATURE';
export const REMOVE_FROM_BASE_FEATURES = 'REMOVE_FROM_BASE_FEATURES';
export const ADD_TO_TO_POW_TRANSFORM = 'ADD_TO_TO_POW_TRANSFORM';
export const CHANGE_SELECTED_TO_POW_TRANSFORM = 'CHANGE_SELECTED_TO_POW_TRANSFORM';
export const REMOVE_FROM_TO_POW_TRANSFORM = 'REMOVE_FROM_TO_POW_TRANSFORM';
export const ADD_TO_TO_LOG_TRANSFORM = 'ADD_TO_TO_LOG_TRANSFORM';
export const CHANGE_SELECTED_TO_LOG_TRANSFORM = 'CHANGE_SELECTED_TO_LOG_TRANSFORM';
export const REMOVE_FROM_TO_LOG_TRANSFORM = 'REMOVE_FROM_TO_LOG_TRANSFORM';
export const ADD_TO_TO_BOOLEAN_TRANSFORM = 'ADD_TO_TO_BOOLEAN_TRANSFORM';
export const CHANGE_SELECTED_TO_BOOLEAN_TRANSFORM = 'CHANGE_SELECTED_TO_BOOLEAN_TRANSFORM';
export const REMOVE_FROM_TO_BOOLEAN_TRANSFORM = 'REMOVE_FROM_TO_BOOLEAN_TRANSFORM';
export const ADD_TRAIN_METHOD = 'ADD_TRAIN_METHOD';
export const CHANGE_SELECTED_TRAIN_METHOD = 'CHANGE_SELECTED_TRAIN_METHOD';
export const CHANGE_SELECTED_TRAIN_VALUE = 'CHANGE_SELECTED_TRAIN_VALUE';
export const REMOVE_TRAIN_METHOD = 'REMOVE_TRAIN_METHOD';
export const LOAD_ERRORS = 'LOAD_ERRORS';
export const CHANGE_DATASET = 'CHANGE_DATASET';

export function loadAllFeatures(features) {
  return {type: ALL_FEATURES_LOADED, features};
}

export function loadingAllFeatures() {
  return {type: ALL_FEATURES_LOADING};
}

export function loadErrors(errors) {
  return {type: LOAD_ERRORS, errors};
}

export function loadMethods(availableMethods) {
  return {type: LOAD_METHODS, availableMethods};
}

export function loadAdminModel(adminModel) {
  return {type: LOAD_ADMIN_MODEL, adminModel};
}

export function addToBaseFeatures() {
  return {type: ADD_TO_BASE_FEATURES};
}

export function changeSelectedBaseFeatures(featureName) {
  return {type: CHANGE_SELECTED_BASE_FEATURE, featureName};
}

export function removeFromBaseFeatures(featureName) {
  return {type: REMOVE_FROM_BASE_FEATURES, featureName};
}

export function addToToPowTransform() {
  return {type: ADD_TO_TO_POW_TRANSFORM};
}

export function changeSelectedToPowTransform(featureName) {
  return {type: CHANGE_SELECTED_TO_POW_TRANSFORM, featureName};
}

export function removeFromToPowTransform(featureName) {
  return {type: REMOVE_FROM_TO_POW_TRANSFORM, featureName};
}

export function addToToLogTransform(featureName) {
  return {type: ADD_TO_TO_LOG_TRANSFORM, featureName};
}

export function changeSelectedToLogTransform(featureName) {
  return {type: CHANGE_SELECTED_TO_LOG_TRANSFORM, featureName};
}

export function removeFromToLogTransform(featureName) {
  return {type: REMOVE_FROM_TO_LOG_TRANSFORM, featureName};
}

export function addToToBooleanTransform(newFeatureName, threshold) {
  return {
    type: ADD_TO_TO_BOOLEAN_TRANSFORM,
    newFeatureName,
    threshold,
  };
}

export function changeSelectedToBooleanTransform(featureName) {
  return {
    type: CHANGE_SELECTED_TO_BOOLEAN_TRANSFORM, featureName,
  };
}

export function removeFromToBooleanTransform(featureName) {
  return {
    type: REMOVE_FROM_TO_BOOLEAN_TRANSFORM, featureName,
  };
}

export function addTrainMethod() {
  return {type: ADD_TRAIN_METHOD};
}

export function changeSelectedTrainMethod(name) {
  return {type: CHANGE_SELECTED_TRAIN_METHOD, name};
}

export function changeSelectedTrainValue(value) {
  return {type: CHANGE_SELECTED_TRAIN_VALUE, value};
}

export function removeTrainMethod(name) {
  return {type: REMOVE_TRAIN_METHOD, name};
}

export function changeDataset(datasetName) {
  return {type: CHANGE_DATASET, datasetName};
}
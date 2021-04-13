import { updateObject } from '../../shared/utility';
import {
	AUTHENTICATE_SUCCESS,
	AUTHENTICATE_FAIL,
	AUTHENTICATE_START,
	AUTHENTICATE_END,
	AUTHENTICATE_REDIRECT_PATH
} from '../actions/actionTypes';

/**
 * @type {{idToken: null, error: null, loading: boolean, localId: null}}
 */
const initialState = {
	idToken: null,
	localId: null,
	error: null,
	loading: false,
	authenticateRedirectPath: '/'
};

/**
 * @type {{USER_DISABLED: string, INVALID_PASSWORD: string, OPERATION_NOT_ALLOWED: string, EMAIL_NOT_FOUND: string, EMAIL_EXISTS: string}}
 */
const ERROR_CODES = {
	EMAIL_NOT_FOUND: 'There is no user record corresponding to this identifier. The user may have been deleted.',
	INVALID_PASSWORD: 'The password is invalid or the user does not have a password.',
	USER_DISABLED: 'The user account has been disabled by an administrator.',
	PASSWORD_LOGIN_DISABLED: 'Password sign-in is disabled for this project.',
	EMAIL_EXISTS: 'The email address is already in use by another account.',
	OPERATION_NOT_ALLOWED: 'Password sign-in is disabled for this project.'
};

/**
 * @param state
 * @returns {*}
 */
const authenticateStart = state => {
	const updatedValues = {
		loading: true,
		error: initialState.error
	};

	return updateObject(state, updatedValues);
};

/**
 * @param state
 * @param action
 * @returns {*}
 */
const authenticateSuccess = (state, action) => {
	const updatedValues = {
		idToken: action.authenticateData.idToken,
		localId: action.authenticateData.localId,
		error: initialState.error,
		loading: initialState.loading
	};

	return updateObject(state, updatedValues);
};

/**
 * @param state
 * @param action
 * @returns {*}
 */
const authenticateFailed = (state, action) => {
	let errorMessage;

	if (ERROR_CODES.hasOwnProperty(action.error.message)) {
		errorMessage = ERROR_CODES[action.error.message];
	} else {
		const errorMessageParts = action.error.message.split(':');

		if (errorMessageParts.length > 1 && errorMessageParts.hasOwnProperty(1)) {
			errorMessage = errorMessageParts[1].trim();
		} else {
			errorMessage = errorMessageParts[0].trim();
		}
	}

	const updatedValues = {
		idToken: initialState.idToken,
		localId: initialState.localId,
		error: errorMessage,
		loading: initialState.loading
	};

	return updateObject(state, updatedValues);
};

/**
 * @param state
 * @returns {*}
 */
const authenticateEnd = state => {
	const updatedValues = {
		idToken: initialState.idToken,
		localId: initialState.localId,
		error: initialState.error,
		loading: initialState.loading
	};

	return updateObject(state, updatedValues);
};

/**
 * @param state
 * @param action
 * @returns {*}
 */
const authenticateRedirectPath = (state, action) => {
	const updatedValues = {
		authenticateRedirectPath: action.path
	};

	return updateObject(state, updatedValues);
};

/**
 * @param state
 * @param action
 * @returns {{idToken: null, error: null, loading: boolean, localId: null}|*}
 */
const authenticate = (state = initialState, action) => {
	switch (action.type) {
		case AUTHENTICATE_START:
			return authenticateStart(state, action);
		case AUTHENTICATE_SUCCESS:
			return authenticateSuccess(state, action);
		case AUTHENTICATE_FAIL:
			return authenticateFailed(state, action);
		case AUTHENTICATE_END:
			return authenticateEnd(state, action);
		case AUTHENTICATE_REDIRECT_PATH:
			return authenticateRedirectPath(state, action);
		default:
			return state;
	}
};

export default authenticate;

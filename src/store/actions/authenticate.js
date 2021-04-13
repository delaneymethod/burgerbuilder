import axiosInstance from '../../axiosInstance';
import {
	AUTHENTICATE_END,
	AUTHENTICATE_FAIL,
	AUTHENTICATE_REDIRECT_PATH,
	AUTHENTICATE_START,
	AUTHENTICATE_SUCCESS
} from './actionTypes';

/**
 * @returns {{type}}
 */
export const authenticateStart = () => {
	return {
		type: AUTHENTICATE_START
	};
};

/**
 * @param authenticateData
 * @returns {{authenticateData, type}}
 */
export const authenticateSuccess = authenticateData => {
	return {
		type: AUTHENTICATE_SUCCESS,
		authenticateData
	};
};

/**
 * @param error
 * @returns {{type: string, error}}
 */
export const authenticateFail = error => {
	return {
		type: AUTHENTICATE_FAIL,
		error
	};
};

/**
 * @returns {{type: string}}
 */
export const authenticateEnd = () => {
	return {
		type: AUTHENTICATE_END
	};
};

/**
 * @param expiresIn
 * @returns {(function(*): void)|*}
 */
export const authenticateCheckExpiresIn = expiresIn => {
	return dispatch => {
		setTimeout(() => dispatch(authenticateEnd()), expiresIn * 1000); // 1 hour
	};
};

/**
 * @param path
 * @returns {{path, type: string}}
 */
export const authenticateRedirectPath = path => {
	return {
		type: AUTHENTICATE_REDIRECT_PATH,
		path
	};
};

/**
 * @param authenticateData
 * @returns {(function(*): void)|*}
 */
export const authenticate = authenticateData => {
	return dispatch => {
		if (authenticateData.action === 'signUp' || authenticateData.action === 'signInWithPassword') {
			dispatch(authenticateStart());

			axiosInstance
				.post(`https://identitytoolkit.googleapis.com/v1/accounts:${authenticateData.action}?key=AIzaSyB-bYSFz-IUd9Z_XZsTGi6ErIIodNVZUh4`, authenticateData)
				.then(response => {
					dispatch(authenticateSuccess(response.data));

					if (response.data.hasOwnProperty('idToken') && response.data.hasOwnProperty('expiresIn')) {
						const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

						localStorage.setItem('idToken', response.data.idToken);
						localStorage.setItem('localId', response.data.localId);
						localStorage.setItem('expirationDate', expirationDate.toString());

						dispatch(authenticateCheckExpiresIn(response.data.expiresIn));
					}
				})
				.catch(error => {
					dispatch(authenticateFail(error.response.data.error));
				});
		} else {
			localStorage.removeItem('idToken');
			localStorage.removeItem('localId');
			localStorage.removeItem('expirationDate');

			dispatch(authenticateEnd());
		}
	};
};

/**
 * @returns {(function(*): void)|*}
 */
export const authenticateAuto = () => {
	return dispatch => {
		const idToken = localStorage.getItem('idToken');

		if (!idToken) {
			dispatch(authenticateEnd());
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));

			if (expirationDate <= new Date()) {
				dispatch(authenticateEnd());
			} else {
				const localId = localStorage.getItem('localId');
				const expiresIn = (expirationDate.getTime() - new Date().getTime()) / 1000;

				dispatch(authenticateSuccess({ idToken, localId }));
				dispatch(authenticateCheckExpiresIn(expiresIn));
			}
		}
	};
};

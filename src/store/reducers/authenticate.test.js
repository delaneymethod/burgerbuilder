import authenticate, { initialState } from './authenticate';
import {
	AUTHENTICATE_START,
	AUTHENTICATE_END,
	AUTHENTICATE_SUCCESS,
	AUTHENTICATE_FAIL,
	AUTHENTICATE_REDIRECT_PATH
} from '../actions/actionTypes';

describe('authenticate reducer', () => {
	let state;

	beforeEach(() => {
		state = { ...initialState };
	});

	it('should set loading to true upon authentication start', () => {
		const action = { type: AUTHENTICATE_START };

		const updatedState = {
			...state,
			loading: true
		};

		expect(authenticate(state, action)).toEqual(updatedState);
	});

	it('should set loading to true upon authentication success', () => {
		const action = {
			type: AUTHENTICATE_SUCCESS,
			authenticateData: {
				idToken: '123',
				localId: '123'
			}
		};

		const updatedState = {
			...state,
			idToken: '123',
			localId: '123'
		};

		expect(authenticate(state, action)).toEqual(updatedState);
	});

	it('should display invalid password error message upon authentication failed', () => {
		const action = {
			type: AUTHENTICATE_FAIL,
			error: {
				message: 'INVALID_PASSWORD',
			}
		};

		const updatedState = {
			...state,
			error: 'The password is invalid or the user does not have a password.'
		};

		expect(authenticate(state, action)).toEqual(updatedState);
	});

	it('should display too many attempts try later error message upon authentication failed', () => {
		const action = {
			type: AUTHENTICATE_FAIL,
			error: {
				message: 'TOO_MANY_ATTEMPTS_TRY_LATER : Some descriptive message.',
			}
		};

		const updatedState = {
			...state,
			error: 'Some descriptive message.'
		};

		expect(authenticate(state, action)).toEqual(updatedState);
	});

	it('should display common error message "as it" upon authentication failed', () => {
		const action = {
			type: AUTHENTICATE_FAIL,
			error: {
				message: 'WEB_API_KEY'
			}
		};

		const updatedState = {
			...state,
			error: 'WEB_API_KEY'
		};

		expect(authenticate(state, action)).toEqual(updatedState);
	});

	it('should initial state upon authentication end', () => {
		const action = { type: AUTHENTICATE_END };

		const updatedState = { ...state };

		expect(authenticate(state, action)).toEqual(updatedState);
	});

	it('should set path upon authenticate redirect', () => {
		const action = {
			type: AUTHENTICATE_REDIRECT_PATH,
			path: '/orders'
		};

		const updatedState = {
			...state,
			authenticateRedirectPath: '/orders'
		};

		expect(authenticate(state, action)).toEqual(updatedState);
	});

	it('should return the initial state for unknown action type', () => {
		expect(authenticate(undefined, { type: 'UNKNOWN' })).toEqual(initialState);
	});
});

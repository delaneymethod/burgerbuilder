import axiosInstance from '../../axiosInstance';
import { ADD_INGREDIENT, FETCH_INGREDIENTS_FAILED, REMOVE_INGREDIENT, SET_INGREDIENTS } from './actionTypes';

/**
 * @param ingredient
 * @returns {{ingredient, type: string}}
 */
export const addIngredient = ingredient => {
	return {
		type: ADD_INGREDIENT,
		ingredient
	};
};

/**
 * @param ingredient
 * @returns {{ingredient, type: string}}
 */
export const removeIngredient = ingredient => {
	return {
		type: REMOVE_INGREDIENT,
		ingredient
	};
};

/**
 * @param ingredients
 * @returns {{ingredients, type: string}}
 */
export const setIngredients = ingredients => {
	return {
		type: SET_INGREDIENTS,
		ingredients
	};
};

/**
 * @returns {{type: string}}
 */
export const fetchIngredientsFailed = () => {
	return {
		type: FETCH_INGREDIENTS_FAILED
	};
};

/**
 * @returns {(function(*): void)|*}
 */
export const fetchIngredients = () => {
	return dispatch => {
		axiosInstance
			.get('/ingredients.json')
			.then(response => {
				dispatch(setIngredients(response.data));
			})
			.catch(() => {
				dispatch(fetchIngredientsFailed());
			});
	};
};

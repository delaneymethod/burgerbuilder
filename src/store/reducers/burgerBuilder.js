import { updateObject } from '../utility';
import { ADD_INGREDIENT, FETCH_INGREDIENTS_FAILED, REMOVE_INGREDIENT, SET_INGREDIENTS } from '../actions/actionTypes';

/**
 * @type {{totalPrice: number, ingredients: null, error: boolean}}
 */
const initialState = {
	error: false,
	ingredients: null,
	totalPrice: 4
};

/**
 * @type {{bacon: number, salad: number, meat: number, cheese: number}}
 */
const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 0.7,
	cheese: 0.4,
	meat: 1.3
};

/**
 * @param state
 * @param action
 * @returns {*}
 */
const addIngredient = (state, action) => {
	const updatedValues = {
		ingredients: {
			...state.ingredients,
			[action.ingredient]: state.ingredients[action.ingredient] + 1
		},
		totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient]
	};

	return updateObject(state, updatedValues);
};

/**
 * @param state
 * @param action
 * @returns {(*)|*}
 */
const removeIngredient = (state, action) => {
	if (state.ingredients[action.ingredient] <= 0) {
		return state;
	}

	const updatedValues = {
		ingredients: {
			...state.ingredients,
			[action.ingredient]: state.ingredients[action.ingredient] - 1
		},
		totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient]
	};

	return updateObject(state, updatedValues);
};

/**
 * @param state
 * @param action
 * @returns {*}
 */
const setIngredients = (state, action) => {
	const updatedValues = {
		error: initialState.error,
		totalPrice: initialState.totalPrice,
		ingredients: {
			salad: action.ingredients.salad,
			bacon: action.ingredients.bacon,
			cheese: action.ingredients.cheese,
			meat: action.ingredients.meat
		}
	};

	return updateObject(state, updatedValues);
};

/**
 * @param state
 * @returns {*}
 */
const fetchIngredientsFailed = state => {
	const updatedValues = {
		error: true
	};

	return updateObject(state, updatedValues);
};

/**
 * @param state
 * @param action
 * @returns {{totalPrice: number, ingredients: {bacon: number, salad: number, meat: number, cheese: number}}|*}
 */
const burgerBuilder = (state = initialState, action) => {
	switch (action.type) {
		case ADD_INGREDIENT:
			return addIngredient(state, action);
		case REMOVE_INGREDIENT:
			return removeIngredient(state, action);
		case SET_INGREDIENTS:
			return setIngredients(state, action);
		case FETCH_INGREDIENTS_FAILED:
			return fetchIngredientsFailed(state, action);
		default:
			return state;
	}
};

export default burgerBuilder;

import React, { Component } from 'react';
import { connect } from 'react-redux';

import axiosInstance from '../../axiosInstance';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { addIngredient, fetchIngredients, purchaseInit, removeIngredient, authenticateRedirectPath } from '../../store/actions';
import PropTypes from 'prop-types';

/**
 * @type {({label: string, type: string}|{label: string, type: string}|{label: string, type: string}|{label: string, type: string})[]}
 */
const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' }
];

export class BurgerBuilder extends Component {
	/**
	 * @type {{purchasing: boolean}}
	 */
	state = {
		purchasing: false
	};

	componentDidMount = () => {
		this.props.fetchIngredients();
	};

	purchase = () => {
		if (this.props.authenticated) {
			this.setState({ purchasing: true });
		} else {
			this.props.authenticateRedirectPath('/checkout');
			this.props.history.push('/authenticate');
		}
	};

	purchaseCancel = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinue = () => {
		this.props.purchaseInit();
		this.props.history.push('/checkout');
	};

	/**
	 * @returns {boolean}
	 */
	updatePurchasable = () => {
		const sum = Object
			.keys(this.props.ingredients)
			.map(ingredientKey => {
				return this.props.ingredients[ingredientKey];
			})
			.reduce((sum, element) => {
				return sum + element;
			}, 0);

		return sum > 0;
	};

	/**
	 * @returns {JSX.Element}
	 */
	render() {
		const disabledIngredients = {
			...this.props.ingredients
		};

		for (const key in disabledIngredients) {
			if (disabledIngredients.hasOwnProperty(key)) {
				disabledIngredients[key] = disabledIngredients[key] <= 0;
			}
		}

		let orderSummary = <div/>;
		let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

		if (this.props.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ingredients}/>
					<BuildControls
						controls={controls}
						totalPrice={this.props.totalPrice}
						purchasable={this.updatePurchasable()}
						purchase={this.purchase}
						authenticated={this.props.authenticated}
						addIngredient={this.props.addIngredient}
						removeIngredient={this.props.removeIngredient}
						disabledIngredients={disabledIngredients}
					/>
				</Aux>
			);

			orderSummary = <OrderSummary
				totalPrice={this.props.totalPrice}
				ingredients={this.props.ingredients}
				onClickCancelButton={this.purchaseCancel}
				onClickContinueButton={this.purchaseContinue}
			/>;
		}

		// {salad: true, meat: false, ...}
		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					onClickModalBackdrop={this.purchaseCancel}
				>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	};
}

BurgerBuilder.propTypes = {
	error: PropTypes.bool.isRequired,
	totalPrice: PropTypes.number.isRequired,
	authenticated: PropTypes.bool.isRequired,
	addIngredient: PropTypes.func.isRequired,
	removeIngredient: PropTypes.func.isRequired,
	fetchIngredients: PropTypes.func.isRequired,
	purchaseInit: PropTypes.func.isRequired,
	authenticateRedirectPath: PropTypes.func.isRequired,
	ingredients: PropTypes.objectOf((props, propName, component) => {
		if (typeof propName !== 'string' && typeof props[propName] !== 'string') {
			return new Error(`Invalid prop key/value supplied to ${component}. Validation failed.`);
		}
	})
};

/**
 * @param state
 * @returns {{totalPrice: (number|number|*), ingredients: (null|{bacon: number, salad: number, meat: number, cheese: number}|*), error}}
 */
const mapStateToProps = state => {
	return {
		error: state.burgerBuilder.error,
		totalPrice: state.burgerBuilder.totalPrice,
		ingredients: state.burgerBuilder.ingredients,
		authenticated: state.authenticate.idToken !== null
	};
};

/**
 * @param dispatch
 * @returns {{removeIngredient: (function(*=): *), fetchIngredients: (function(): *), addIngredient: (function(*=): *)}}
 */
const mapDispatchToProps = dispatch => {
	return {
		addIngredient: ingredient => dispatch(addIngredient(ingredient)),
		removeIngredient: ingredient => dispatch(removeIngredient(ingredient)),
		fetchIngredients: () => dispatch(fetchIngredients()),
		purchaseInit: () => dispatch(purchaseInit()),
		authenticateRedirectPath: path => dispatch(authenticateRedirectPath(path))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosInstance));

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
import { addIngredient, fetchIngredients, purchaseInit, removeIngredient } from '../../store/actions';

/**
 * @type {({label: string, type: string}|{label: string, type: string}|{label: string, type: string}|{label: string, type: string})[]}
 */
const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' }
];

class BurgerBuilder extends Component {
	/**
	 * @type {{purchasing: boolean}}
	 */
	state = {
		purchasing: false
	};

	componentDidMount = () => {
		this.props.fetchIngredients();
	};

	purchase = () => this.setState({ purchasing: true });

	purchaseCancel = () => this.setState({ purchasing: false });

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
			disabledIngredients[key] = disabledIngredients[key] <= 0;
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

/**
 * @param state
 * @returns {{totalPrice: (number|number|*), ingredients: (null|{bacon: number, salad: number, meat: number, cheese: number}|*), error}}
 */
const mapStateToProps = state => {
	return {
		error: state.burgerBuilder.error,
		totalPrice: state.burgerBuilder.totalPrice,
		ingredients: state.burgerBuilder.ingredients
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
		purchaseInit: () => dispatch(purchaseInit())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosInstance));

import React, { Component } from 'react';
import axiosInstance from '../../axiosIntance';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
	 * @type {{purchasable: boolean, showError: boolean, totalPrice: number, purchasing: boolean, ingredients: {}, error: null, loading: boolean}}
	 */
	state = {
		error: null,
		showError: false,
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false
	};

	componentDidMount = () => {
		axiosInstance
			.get('/ingredients.json')
			.then(response => {
				this.setState({ ingredients: response.data });
			})
			.catch(error => {
				this.setState({
					error,
					showError: true
				});
			});
	};

	purchase = () => this.setState({ purchasing: true });

	purchaseCancel = () => this.setState({ purchasing: false });

	purchaseContinue = () => {
		const queryParams = [];

		queryParams.push('totalPrice=' + this.state.totalPrice);

		for (const ingredient in this.state.ingredients) {
			if (this.state.ingredients.hasOwnProperty(ingredient)) {
				queryParams.push(encodeURIComponent(ingredient) + '=' + encodeURIComponent(this.state.ingredients[ingredient]));
			}
		}

		const queryString = queryParams.join('&');

		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		});
	};

	/**
	 * @param ingredients
	 */
	updatePurchasable = ingredients => {
		const sum = Object
			.keys(ingredients)
			.map(ingredientKey => {
				return ingredients[ingredientKey];
			})
			.reduce((sum, element) => {
				return sum + element;
			}, 0);

		this.setState({ purchasable: sum > 0 });
	};

	/**
	 * @param type
	 */
	addIngredient = type => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = { ...this.state.ingredients };

		updatedIngredients[type] = updatedCount;

		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const updatedPrice = oldPrice + priceAddition;

		this.setState({
			totalPrice: updatedPrice,
			ingredients: updatedIngredients
		});

		this.updatePurchasable(updatedIngredients);
	};

	/**
	 * @param type
	 */
	removeIngredient = type => {
		const oldCount = this.state.ingredients[type];

		if (oldCount <= 0) {
			return;
		}

		const updatedCount = oldCount - 1;
		const updatedIngredients = { ...this.state.ingredients };

		updatedIngredients[type] = updatedCount;

		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const updatedPrice = oldPrice - priceDeduction;

		this.setState({
			totalPrice: updatedPrice,
			ingredients: updatedIngredients
		});

		this.updatePurchasable(updatedIngredients);
	};

	/**
	 * @returns {JSX.Element}
	 */
	render() {
		const disabledIngredients = {
			...this.state.ingredients
		};

		for (const key in disabledIngredients) {
			disabledIngredients[key] = disabledIngredients[key] <= 0;
		}

		let orderSummary = <div/>;
		let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

		if (this.state.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients}/>
					<BuildControls
						controls={controls}
						totalPrice={this.state.totalPrice}
						purchasable={this.state.purchasable}
						purchase={this.purchase}
						addIngredient={this.addIngredient}
						removeIngredient={this.removeIngredient}
						disabledIngredients={disabledIngredients}
					/>
				</Aux>
			);

			orderSummary = <OrderSummary
				totalPrice={this.state.totalPrice}
				ingredients={this.state.ingredients}
				onClickCancelButton={this.purchaseCancel}
				onClickContinueButton={this.purchaseContinue}
			/>;
		}

		if (this.state.loading) {
			orderSummary = <Spinner/>;
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

export default withErrorHandler(BurgerBuilder, axiosInstance);

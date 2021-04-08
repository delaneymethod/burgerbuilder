import React, { Component } from 'react';
import axiosOrders from '../../axiosOrders';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BurgerIngredient from '../../components/Burger/BurgerIngredient/BurgerIngredient';
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
	 * @type {{purchasable: boolean, totalPrice: number, purchasing: boolean, ingredients: {bacon: number, salad: number, meat: number, cheese: number}, loading: boolean}}
	 */
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false
	};

	purchase = () => this.setState({ purchasing: true });

	purchaseCancel = () => this.setState({ purchasing: false });

	purchaseContinue = () => {
		this.setState({ loading: true });

		const order = {
			totalPrice: this.state.totalPrice,
			ingredients: this.state.ingredients,
			customer: {
				fullName: 'Sean Delaney',
				postalAddress: {
					street1: 'Test Street 1',
					street2: 'Test Street 2',
					city: 'Test City',
					postalCode: 'Test Postal Code',
					country: 'United Kingdom'
				},
				email: 'hello@delaneymethod.com'
			},
			deliveryMethod: 'standard'
		};

		axiosOrders
			.post('/orders.json', order)
			.then(response => {
				console.log(response);

				this.setState({
					loading: false,
					purchasing: false
				});
			})
			.catch(error => {
				console.error(error);

				this.setState({
					loading: false,
					purchasing: false
				});
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
	 * @returns {{bacon: number, salad: number, meat: number, cheese: number}}
	 */
	getDisabledIngredients = () => {
		const disabledIngredients = {
			...this.state.ingredients
		};

		for (const key in disabledIngredients) {
			disabledIngredients[key] = disabledIngredients[key] <= 0;
		}

		return disabledIngredients;
	};

	/**
	 * @returns {unknown[]}
	 */
	getIngredientsSummary = () => {
		return Object
			.keys(this.state.ingredients)
			.map(ingredientKey => {
				return (
					<li key={ingredientKey}>
						<span style={{ textTransform: 'capitalize' }}>
							{ingredientKey}
						</span>: {this.state.ingredients[ingredientKey]}
					</li>
				);
			});
	};

	/**
	 * @returns {unknown[]}
	 */
	getBurgerIngredients = () => {
		let burgerIngredients = Object
			.keys(this.state.ingredients)
			.map(ingredientKey => {
				return [...Array(this.state.ingredients[ingredientKey])].map((_, index) => {
					return (
						<BurgerIngredient
							key={ingredientKey + index}
							type={ingredientKey}
						/>
					);
				});
			})
			.reduce((array, element) => {
				return array.concat(element);
			}, []);

		if (burgerIngredients.length === 0) {
			burgerIngredients = <p>Please start adding ingredients</p>;
		}

		return burgerIngredients;
	};

	/**
	 * @returns {JSX.Element}
	 */
	getOrderSummary = () => {
		const ingredientsSummary = this.getIngredientsSummary();

		let orderSummary = <OrderSummary
			totalPrice={this.state.totalPrice}
			ingredientsSummary={ingredientsSummary}
			onClickCancelButton={this.purchaseCancel}
			onClickContinueButton={this.purchaseContinue}
		/>;

		if (this.state.loading) {
			orderSummary = <Spinner/>;
		}

		return orderSummary;
	};

	/**
	 * @returns {JSX.Element}
	 */
	render() {
		const orderSummary = this.getOrderSummary();
		const burgerIngredients = this.getBurgerIngredients();
		const disabledIngredients = this.getDisabledIngredients();

		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					onClickModalBackdrop={this.purchaseCancel}
				>
					{orderSummary}
				</Modal>
				<Burger burgerIngredients={burgerIngredients}/>
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
	};
}

export default withErrorHandler(BurgerBuilder, axiosOrders);

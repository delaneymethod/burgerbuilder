import React, { Component } from 'react';

import classes from './Burger.module.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

class Burger extends Component {
	/**
	 * @returns {JSX.Element}
	 */
	render() {
		return (
			<div className={classes.Burger}>
				<BurgerIngredient type={'bread-top'}/>
				{this.props.burgerIngredients}
				<BurgerIngredient type={'bread-bottom'}/>
			</div>
		);
	};
}

export default Burger;

import React, { Component } from 'react';

import classes from './CheckoutSummary.module.css';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

class CheckoutSummary extends Component {
	/**
	 * @returns {JSX.Element}
	 */
	render() {
		return (
			<div className={classes.CheckoutSummary}>
				<h1>We hope it tastes well!</h1>
				<div style={{
					width: '100%',
					margin: 'auto'
				}}>
					<Burger ingredients={this.props.ingredients}/>
				</div>
				<Button
					type={'Danger'}
					onClick={this.props.onClickCancelButton}
				>
					Cancel
				</Button>
				<Button
					type={'Success'}
					onClick={this.props.onClickContinueButton}
				>
					Continue
				</Button>
			</div>
		);
	};
}

export default CheckoutSummary;

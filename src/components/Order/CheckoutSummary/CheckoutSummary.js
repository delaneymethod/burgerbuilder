import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
					type={'button'}
					className={'Danger'}
					onClick={this.props.onClickCancelButton}
				>
					Cancel
				</Button>
				<Button
					type={'button'}
					className={'Success'}
					onClick={this.props.onClickContinueButton}
				>
					Continue
				</Button>
			</div>
		);
	};
}

CheckoutSummary.propTypes = {
	onClickContinueButton: PropTypes.func.isRequired,
	onClickCancelButton: PropTypes.func.isRequired,
	ingredients: PropTypes.objectOf((props, propName, component) => {
		if (typeof propName !== 'string' && typeof props[propName] !== 'string') {
			return new Error(`Invalid prop key/value supplied to ${component}. Validation failed.`);
		}
	}).isRequired
};

export default CheckoutSummary;

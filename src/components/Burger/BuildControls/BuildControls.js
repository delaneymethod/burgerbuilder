import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import classes from './BuildControls.module.css';

import Button from '../../UI/Button/Button';
import BuildControl from './BuildControl/BuildControl';

// MAYBE - This could be a functional component
class BuildControls extends Component {
	/**
	 * @returns {JSX.Element}
	 */
	render() {
		return (
			<div className={classes.BuildControls}>
				<p>Current Price <strong>{this.props.totalPrice.toFixed(2)}</strong></p>
				{this.props.controls.map(control => {
					return (
						<BuildControl
							key={control.label}
							label={control.label}
							addIngredient={() => this.props.addIngredient(control.type)}
							removeIngredient={() => this.props.removeIngredient(control.type)}
							disabledIngredient={this.props.disabledIngredients[control.type]}
						/>
					);
				})}
				<Button
					type={'button'}
					className={classes.OrderButton}
					disabled={!this.props.purchasable}
					onClick={this.props.purchase}
				>
					Order Now
				</Button>
			</div>
		);
	};
}

BuildControls.propTypes = {
	purchase: PropTypes.func.isRequired,
	purchasable: PropTypes.bool.isRequired,
	totalPrice: PropTypes.number.isRequired,
	addIngredient: PropTypes.func.isRequired,
	removeIngredient: PropTypes.func.isRequired,
	controls: PropTypes.arrayOf(PropTypes.exact({
		type: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired
	})).isRequired,
	disabledIngredients: PropTypes.objectOf((props, propName, component) => {
		if (typeof propName !== 'string' && typeof props[propName] !== 'boolean') {
			return new Error(`Invalid prop key/value supplied to ${component}. Validation failed.`);
		}
	}).isRequired
};

export default BuildControls;

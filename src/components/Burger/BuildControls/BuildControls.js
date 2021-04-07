import React, { Component } from 'react';

import classes from './BuildControls.module.css';

import BuildControl from './BuildControl/BuildControl';

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
				<button
					className={classes.OrderButton}
					disabled={!this.props.purchasable}
					onClick={this.props.purchase}
				>
					Order Now
				</button>
			</div>
		);
	};
}

export default BuildControls;

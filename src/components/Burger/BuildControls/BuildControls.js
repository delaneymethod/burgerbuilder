import React, { Component } from 'react';

import classes from './BuildControls.module.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' }
];

class BuildControls extends Component {
	render() {
		return (
			<div className={classes.BuildControls}>
				{controls.map(control => {
					return (
						<BuildControl
							key={control.label}
							label={control.label}
							addIngredient={() => this.props.addIngredient(control.type)}
							removeIngredient={() => this.props.removeIngredient(control.type)}
						/>
					);
				})}
			</div>
		);
	};
}

export default BuildControls;

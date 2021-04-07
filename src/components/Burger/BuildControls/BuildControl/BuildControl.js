import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import classes from './BuildControl.module.css';

class BuildControl extends Component {
	/**
	 * @returns {JSX.Element}
	 */
	render() {
		return (
			<div className={classes.BuildControl}>
				<div className={classes.Label}>
					{this.props.label}
				</div>
				<button
					className={classes.Less}
					onClick={this.props.removeIngredient}
					disabled={this.props.disabledIngredient}
				>
					Less
				</button>
				<button
					className={classes.More}
					onClick={this.props.addIngredient}
				>
					More
				</button>
			</div>
		);
	};
}

BuildControl.propTypes = {
	label: PropTypes.string.isRequired,
	addIngredient: PropTypes.func.isRequired,
	removeIngredient: PropTypes.func.isRequired,
	disabledIngredient: PropTypes.bool.isRequired
};

export default BuildControl;

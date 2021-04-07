import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import classes from './Modal.module.css';

import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
	/**
	 * @param nextProps
	 * @param nextState
	 * @param nextContext
	 * @returns {boolean}
	 */
	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return nextProps.show !== this.props.show;
	};

	/**
	 * @returns {JSX.Element}
	 */
	render() {
		return (
			<Aux>
				<Backdrop
					show={this.props.show}
					onClick={this.props.onClickModalBackdrop}
				/>
				<div
					className={classes.Modal}
					style={{
						transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: this.props.show ? '1' : '0'
					}}
				>
					{this.props.children}
				</div>
			</Aux>
		);
	};
}

Modal.propTypes = {
	show: PropTypes.bool.isRequired,
	children: PropTypes.element.isRequired,
	onClickModalBackdrop: PropTypes.func.isRequired
};

export default Modal;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { authenticate } from '../../../store/actions';

class Logout extends Component {
	componentDidMount() {
		const formData = {};
		formData.action = 'signOut';

		this.props.authenticate(formData);
	}

	/**
	 * @returns {JSX.Element}
	 */
	render() {
		return <Redirect to={'/'}/>;
	};
}

Logout.propTypes = {
	authenticate: PropTypes.func.isRequired
};

/**
 * @param dispatch
 * @returns {{authenticate: (function(): *)}}
 */
const mapDispatchToProps = dispatch => {
	return {
		authenticate: authenticateData => dispatch(authenticate(authenticateData))
	};
};

export default connect(null, mapDispatchToProps)(Logout);

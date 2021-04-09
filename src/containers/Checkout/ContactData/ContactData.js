import React, { Component } from 'react';

import classes from './ContactData.module.css';

import Spinner from '../../../components/UI/Spinner/Spinner';
import axiosInstance from '../../../axiosIntance';
import Button from '../../../components/UI/Button/Button';

class ContactData extends Component {
	state = {
		fullName: '',
		email: '',
		postalAddress: {
			streetLine1: '',
			streetLine2: '',
			city: '',
			postalCode: '',
			country: ''
		},
		error: null,
		showError: false,
		loading: false
	};

	/**
	 * @param event
	 */
	orderNow = (event) => {
		event.preventDefault();

		this.setState({ loading: true });

		const order = {
			totalPrice: this.props.totalPrice,
			ingredients: this.props.ingredients,
			customer: {
				fullName: 'Sean Delaney',
				email: 'hello@delaneymethod.com',
				postalAddress: {
					streetLine1: 'Test Street Line 1',
					streetLine2: 'Test Street Line 2',
					city: 'Test City',
					postalCode: 'Test Postal Code',
					country: 'United Kingdom'
				}
			},
			deliveryMethod: 'standard'
		};

		axiosInstance
			.post('/orders.json', order)
			.then(() => {
				this.setState({
					loading: false
				});

				this.props.history.push('/');
			})
			.catch(error => {
				this.setState({
					error,
					showError: true,
					loading: false
				});
			});
	};

	/**
	 * @returns {JSX.Element}
	 */
	render() {
		let form = (
			<form>
				<input className={classes.Input} type={'text'} name={'fullName'} placeholder={'Your full name'}/>
				<input className={classes.Input} type={'text'} name={'streetLine1'} placeholder={'Your street line 1'}/>
				<input className={classes.Input} type={'text'} name={'streetLine2'} placeholder={'Your street line 2'}/>
				<input className={classes.Input} type={'text'} name={'city'} placeholder={'Your city'}/>
				<input className={classes.Input} type={'text'} name={'postalCode'} placeholder={'Your postal code'}/>
				<input className={classes.Input} type={'text'} name={'country'} placeholder={'Your country'}/>
				<input className={classes.Input} type={'email'} name={'email'} placeholder={'Your email'}/>
				<Button
					type={'Success'}
					onClick={event => this.orderNow(event)}
				>
					Order Now
				</Button>
			</form>
		);

		if (this.state.loading) {
			form = <Spinner/>;
		}

		return (
			<div className={classes.ContactData}>
				<h4>Please enter your contact details</h4>
				{form}
			</div>
		);
	};
}

export default ContactData;

/**
 * @param oldObject
 * @param updatedValues
 * @returns {*}
 */
export const updateObject = (oldObject, updatedValues) => {
	return {
		...oldObject,
		...updatedValues
	};
};

/**
 * @param value
 * @param rules
 * @returns {boolean}
 */
export const checkValidity = (value, rules) => {
	let isValid = true;

	if (!rules || !rules.required) {
		return isValid;
	}

	if (rules.required) {
		isValid = value.trim() !== '' && isValid;
	}

	if (rules.minLength) {
		isValid = value.length >= rules.minLength && isValid;
	}

	if (rules.maxLength) {
		isValid = value.length <= rules.maxLength && isValid;
	}

	if (rules.isEmail) {
		const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

		isValid = pattern.test(value) && isValid;
	}

	/*
	if (rules.isNumeric) {
		const pattern = /^\d+$/;

		isValid = pattern.test(value) && isValid;
	}
	*/

	return isValid;
};

/**
 * @param event
 * @param form
 * @param inputId
 * @returns {{formIsValid: boolean, updatedForm: *}}
 */
export const updateForm = (event, form, inputId) => {
	const updatedFormElement = updateObject(form[inputId], {
		isValid: checkValidity(event.target.value, form[inputId].validation),
		value: event.target.value,
		touched: true
	});

	const updatedForm = updateObject(form, {
		[inputId]: updatedFormElement
	});

	let formIsValid = true;

	for (const input in updatedForm) {
		if (updatedForm.hasOwnProperty(input)) {
			if (!updatedForm[input].validation || !updatedForm[input].validation.required) {
				continue;
			}

			formIsValid = updatedForm[input].isValid && formIsValid;
		}
	}

	return {
		updatedForm,
		formIsValid
	};
};

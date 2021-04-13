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

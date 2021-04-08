import axios from 'axios';

const axiosOrders = axios.create({
	baseURL: 'https://react-burgerbuilder-example-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default axiosOrders;

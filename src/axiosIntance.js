import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://react-burgerbuilder-example-default-rtdb.europe-west1.firebasedatabase.app'
});

export default axiosInstance;

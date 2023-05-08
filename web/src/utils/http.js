import axios from 'axios'
import router from '../router'
import { Toast } from 'vant'

const http = axios.create({
	baseURL: 'http://localhost:5003/web/api',
	// baseURL: 'http://localhost:3000/admin/api'
	headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
})
http.interceptors.request.use(function (config) {
	// Do something before request is sent
	if (localStorage.token) {
		config.headers.Authorization = 'Bearer ' + localStorage.token
	}
	return config;
}, function (error) {
	// Do something with request error
	return Promise.reject(error);
});
http.interceptors.response.use(res => {
	return res
}, err => {
	if (err.response.data.message) {
		Toast.fail(err.response.data.message)
		if (err.response.status === 401) {
			router.push('/login')
		}
	}

	return Promise.reject(err)
})

export default http
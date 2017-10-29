import axios from 'axios'
import Actions from './Actions'

module.exports = {
	get: function () {
		axios.get('https://launchlibrary.net/1.2/launch/next/20')
			.then(function (response) {
				console.log(response)
				Actions.receiveData(response.data)
			})
			.catch(function (error) {
				console.log(error)
			})
	}
}

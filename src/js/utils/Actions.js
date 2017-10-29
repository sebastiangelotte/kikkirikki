import AppDispatcher from './AppDispatcher'
import ActionTypes from './ActionTypes'
import APIHandler from './APIHandler'

module.exports = {
	getData: function () {
		AppDispatcher.handleViewAction({
			actionType: ActionTypes.LOAD_DATA,
		})
		console.log("Actions.getData")
		APIHandler.get()
	},
	receiveData: function (response) {
		AppDispatcher.handleServerAction({
			actionType: ActionTypes.RECIEVE_DATA,
			response: response
		})
	},
	clearData: function () {
		AppDispatcher.handleServerAction({
			actionType: ActionTypes.CLEAR_DATA,
		})
		console.log("clearData");
	}
}

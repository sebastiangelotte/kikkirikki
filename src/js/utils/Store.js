// Store
//
// Requiring the Dispatcher, Constants, and
// event emitter dependencies
import ObjectAssign from 'object-assign'
import Events from 'events'
import AppDispatcher from './AppDispatcher'
import ActionTypes from './ActionTypes'
const CHANGE_EVENT = 'change'


// Define the store as an empty array
let store = {
	data: []
}

// Define the public event listeners and getters that
// the views will use to listen for changes and retrieve
// the store
let Store = ObjectAssign( {}, Events.EventEmitter.prototype, {
	addChangeListener: function (callback) {
		this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener: function (callback) {
		this.removeListener(CHANGE_EVENT, callback)
	},
	getData: function () {
		return store
	}
})

// Register each of the actions with the dispatcher
// by changing the store's data and emitting a
// change
AppDispatcher.register(function (payload) {
	const action = payload.action

	switch(action.actionType) {
		case ActionTypes.LOAD_DATA:
			Store.emit(CHANGE_EVENT)
			break

		case ActionTypes.CLEAR_DATA:
			store.data = []
			Store.emit(CHANGE_EVENT)
			break

		default:
			return true
	}
})

module.exports = Store

export default {
	getUsers(context, payload) {
		context.commit('getUsers', payload);
	},
	updateUser(context, payload) {
		context.commit('updateUser', payload);
	},
	addItem(context, payload) {
		context.commit('addItem', payload);
	},
	removeUser(context, payload) {
		context.commit('removeUser', payload);
	}
};
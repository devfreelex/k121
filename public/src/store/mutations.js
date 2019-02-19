export default {
	getUsers(state, payload) {
		if(payload && payload.length) state.users = [...state.users, ...payload]
		return state;
	},
	addItem(state, payload) {
		if (payload.name && payload.email) state.users.push(payload);
		return state;
	},
	updateUser(state, payload) {
		const { users } = state
		const listUsers = users.filter( user => {
			if(user._id === payload._id) {
				user.name = payload.name
				user.email = payload.email
			}
			return user
		})
		return state;
	},
	removeUser(state, payload) {
		state.users = state.users.filter(user => {
			if (user._id !== payload._id) return user
		})
		return state
	}
};
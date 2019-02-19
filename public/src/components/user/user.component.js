import Component from '../../../lib/component.js'
import { event } from '../../../lib/event.js'
import userService from '../../services/user.service.js'

export default class Form extends Component {
    constructor(store) {
        super({
            store,
            element: 'user-component'
        })
        this.store = store
        this.getUsers()
    }

    getUsers () {
        event.subscribe('onInit', async status => {
            const users = await userService.getUsers(this.store)
            this.store.dispatch('getUsers', users)
        })
    }

    edit (e) {
        e.preventDefault()
        const {userId} = e.target.dataset
        event.publish('editUser', { userId })
    }

    async remove (e) {
        e.preventDefault()
        const {userId} = e.target.dataset
        const removedUser = await userService.removeUser(userId)
        console.log(removedUser)
        this.store.dispatch('removeUser', removedUser)
        // event.publish('removeItem', { userId })
    }

    render(state, actions, mutations) {
        if(!state || !state.users) return ''
        return /*html*/`
            <h2 class="component__title"> 
                <span class="component__title__tag">Cadastrados</span>
            </h2>
            ${state.users.map( user => {
                return /*html*/`
                    <div class="user__box grid grid-4">
                        <div class="user__container">
                            <div class="user__img">&#x1F9D1</div>
                            <div class="user__info">
                                <div class="user__name">${user.name}</div>
                                <div class="user__email">${user.email}</div>
                            </div>
                            <div class="user__controls">
                                <button class="user__button user--edit" data-user-id="${user._id}" click="edit">Editar</button>
                                <button class="user__button user--remove" data-user-id="${user._id}" click="remove">Remover</button>
                            </div>
                        </div>
                    </div>                  
                `
            }).join('')}
        `
    }
}
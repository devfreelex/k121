import Component from '../../../lib/component.js'
import { bindElement } from '../../../lib/bind.js'
import { event } from '../../../lib/event.js'

import nameValidator from '../../validators/name.validator.js'
import emailValidator from '../../validators/email.validator.js'
import userService from '../../services/user.service.js';
export default class Form extends Component {
    constructor(store) {
        super({
            store,
            element: 'register-component'
        })
        this.store = store
        this.isInvalidName
        this.isInvalidEmail
        this.update()
        this.showRegister()
        this.validateForm()
    }

    update() {
        event.subscribe('editUser', data => {
            const { users } = this.store.state
            const { name, email } = bindElement(this)

            const user = users.find(user => {
                if (user._id === data.userId) {
                    return user
                }
            })

            this.user = user
            email.value = this.user.email
            name.value = this.user.name
        })

        event.subscribe('removeUser', (data) => {
            const { name, email } = bindElement(this)
            if (this.user && (parseInt(data.userId) === this.user._id)) {
                delete this.user
                this.resetForm(name, email)
            }
        })
    }

    resetForm(name, email) {

        this.isFormValid = false
        this.isNameValid = false
        this.isEmailValid = false

        name.value = ''
        email.value = ''
        delete this.user
    }

    async save(e) {
        e.preventDefault()

        const { name, email } = bindElement(this)

        if (!this.hasUser()) {
            const payload = { name: name.value, email: email.value }
            const newUser = await userService.addUser(payload)
            this.store.dispatch('addItem', newUser);
            this.resetForm(name, email)
            return
        }


        name.value = this.user.name
        email.value = this.user.email
        userService.updateUser(this.user)
        this.store.dispatch('updateUser', this.user);
        this.resetForm(name, email)
    }

    toggleRegister(e) {
        e.preventDefault()

        const { name, email } = bindElement(this)
        if (this.user && this.user._id) {
            this.resetForm(name, email)
            return
        }

        const toggleClass = 'register--hidden'
        const { form } = bindElement(this)
        form.classList.toggle(toggleClass)

    }

    goToTop(element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
    }

    showRegister() {
        event.subscribe('editUser', () => {
            const showClass = 'register--hidden'
            const { form } = bindElement(this)
            if (form.classList.contains(showClass)) {
                form.classList.remove(showClass)
            }
            this.goToTop(form)
        })
    }

    setData(prop, value) {
        if (this.user && this._id !== '') {
            this.user[prop] = value
        }
    }

    nameValidate(e) {

        const name = nameValidator(this)
        const form = bindElement(this)
        const { name: inputName } = form

        name.isValidInput()
            .then(status => {
                name.setStatusInput(status)
            })
            .then(() => {
                return name.isValidForm()
            })
            .then(status => {
                name.setStatusForm(status)
                this.setData('name', inputName.value)
            })
    }

    emailValidate(e) {

        const email = emailValidator(this)
        const form = bindElement(this)
        const { email: inputEmail } = form

        email.isValidInput()
            .then(status => {
                email.setStatusInput(status)
            })
            .then(() => {
                return email.isValidForm()
            })
            .then(status => {
                email.setStatusForm(status)
                this.setData('email', inputEmail.value)
            })


    }

    validateForm() {
        event.subscribe('onFormChange', data => {
            const { btnSave } = bindElement(this)
            if (data && data.status) {
                btnSave.removeAttribute('disabled')
                return
            }
            btnSave.setAttribute('disabled', true)
        })
    }

    idGenerator() {
        const min = Math.ceil(1);
        const max = Math.floor(60000);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    hasUser() {
        return this.user && this.user.name !== '' && this.user.email !== ''
    }

    render(state, actions, mutations) {

        return /*html*/`
                <h2 class="component__title"> 
                    <span class="component__title__tag">Cadastro</span>
                    <button class="component__toggle" click="toggleRegister">Novo</button>
                </h2>
                <form action="" class="register__form register--hidden" data-bind="form" id="register">
                    <label for="" class="register__form__label grid grid-3">
                        <span class="register__form__title">Nome</span>
                        <input type="text" class="register__form--input" keyup="nameValidate" data-bind="name">
                    </label>
                    <label for="" class="register__form--label grid grid-3">
                        <span class="register__form__title">E-mail</span>
                        <input type="email" class="register__form--input" keyup="emailValidate" data-bind="email">
                    </label>
                    <div class="register__form__label grid grid-3">
                        <button class="register__button button--disabled" click="save" data-bind="btnSave" disabled>Salvar</button>
                    </div>
                </form>
          `
    }

}
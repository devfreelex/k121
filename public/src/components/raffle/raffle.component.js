import Component from '../../../lib/component.js'
import { bindElement } from '../../../lib/bind.js';
import userService from '../../services/user.service.js';

export default class Form extends Component {
    constructor(store) {
        super({
            store,
            element: 'raffle-component'
        })
        this.store = store
    }

    raffle (e) {
        userService.toRaffle()
        .then( data => { 
            this.showLoader(data)
        })
        .catch( err => console.log(err))
    }

    showLoader () {
        const {loader} = bindElement(this)
        loader.classList.toggle('loader--hidden')
        setTimeout(() => {
            loader.classList.add('loader--hidden')
        },1500)
    }

    render(state, actions, mutations) {
        if(!state || !state.users) return
        return /*html*/`
            <div class="raffle__box">
                <div class="box__loader loader--hidden" data-bind="loader">
                    <div class="loader"></div>
                    <span class="loader__msg">Enviando emails...</span>
                </div>
                
                <button class="raffle__button raffle--is-hover" click="raffle" click="raffle">Sortear</button>
            </div>
          `
    }    

}
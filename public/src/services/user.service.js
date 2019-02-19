    const uri = '/api/users'

    const getUsers = (store) => {
        return fetch(`${uri}`)
        .then( resp => resp.json())
        .then(data => data)
        .catch( err => console.log(err))
    }

    const addUser = (user) => {
        return fetch(`${uri}`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then( resp => resp.json())
        .then(data => data)
        .catch( err => console.log(err))
    }

    const updateUser = (user) => {
        return fetch(`${uri}/${user._id}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then( resp => resp.json())
        .then(data => data)
        .catch( err => console.log(err))        
    }

    const removeUser = (id) => {
        return fetch(`${uri}/${id}`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
        })
        .then( resp => resp.json())
        .then(data => data)
        .catch( err => console.log(err))
    }


    export default {
        getUsers, addUser, updateUser, removeUser
    }

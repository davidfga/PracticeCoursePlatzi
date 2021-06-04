const bcrypt = require('bcrypt')

const auth = require('../../../auth')
const err = require('../../../utils/error')
const error = require('../../../utils/error')
const TABLA = 'auth'

module.exports = function (injectedStore) {
    let store = injectedStore
    
    if(!store) {
        store = require('../../../store/dummy')
    }

    async function login (username, password){
        const data = JSON.parse(JSON.stringify(await store.query(TABLA, {username: username})))

        return bcrypt.compare(password, data.password)
            .then(isEqual => {
                if(isEqual === true){
                    //Gen Token
                    return auth.sign(data)
                } else {
                    throw error('Invalid Information', 401)
                }
            })

    }

    async function upsert(data){
        const authData = {
            id: data.id,

        }

        if(data.username){
            authData.username = data.username
        }

        if(data.password){
            authData.password = await bcrypt.hash(data.password, 5)
        }

        return store.upsert(TABLA, authData)
    }

    return {
        upsert,
        login,
    }
}
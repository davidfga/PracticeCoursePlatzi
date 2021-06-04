const { nanoid } = require('nanoid')

const TABLA = 'post'

module.exports = function (injectedStore) {
    let store = injectedStore
    
    if(!store) {
        store = require('../../../store/dummy')
    }

    async function list(){
        return store.list(TABLA)
    }

    async function get(id){
        return store.get(TABLA, id)
    }
    
    async function upsert(body) {

        const post = {
            id: body.id,
            text: body.text,
            user: body.user
        }

        if(body.id) {
            post.id = body.id
        } else {
            post.id = nanoid()
        }

        return store.upsert(TABLA, post)
    }
        
    return {
        list,
        upsert,
        get,
        }

    }


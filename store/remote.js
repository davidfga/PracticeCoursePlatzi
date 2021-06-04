const request = require('request')


function createRemoteDB(host, port) {
    const URL = 'http://' + host + ':' + port

    function list(table) {
        return req('GET', table)
    }

    function get(table, id) {
    }
    
    function upsert(table, id) {
        //
    }
    function query(table, query, join) {
        //
    }

    function req(method, table, data) {
        let url
        let body = ''

        if(data){
            url = URL + '/' + table + '/' + data
        }else{
            url = URL + '/' + table
        }
        
        return new Promise ((resolve, reject) => {
            request({
                method,
                headers: {
                    'content-type': 'application/json',
                },
                url,
                body,
            },(err, req, body) => {
                if(err){
                    console.error('Fail remote BBDD', err)
                    return reject(err.message)
                }
                const resp = JSON.parse(body)
                return resolve(resp.body)
            })
        })
    }



    return {
        list,
        get,
        query,
        upsert,
    }
}

module.exports = createRemoteDB
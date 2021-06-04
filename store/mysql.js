const mysql = require('mysql')

const config = require('../config')

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let connection

function handleConn() {
    connection = mysql.createConnection(dbconf)

    connection.connect((err) => {
        if(err){
            console.error('[db err]', err)
            setTimeout(handleConn, 2000)
        }else{
            console.error('[db connected]')
        }

    })

    connection.on('error', err => {
        console.error('[db err]', err)
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            handleConn()
        }else {
            throw err
        }
    })
}

handleConn()

function list(table) {
    return new Promise (( reslove, reject)=>{
        connection.query(`SELECT * FROM ${table}`, (err, data)=>{
            if(err)return reject(err)
            reslove(data)
        })
    })
}

function get(table, id) {
    return new Promise (( reslove, reject)=>{
        connection.query(`SELECT * FROM ${table} WHERE id= ${id}`, (err, data)=>{
            if(err) return reject(err)
            reslove(data)
        })
    })
}

function insert(table, data) {
    return new Promise (( reslove, reject)=>{
        connection.query(`INSERT INTO ${table} SET ?`,data, (err, result)=>{
            if(err)return reject(err)
            reslove(result)
        })
    })
}

function update(table, data) {
    return new Promise (( reslove, reject)=>{
        connection.query(`UPDATE ${table} SET ? WHERE id=?`,[data, data.id], (err, result)=>{
            if(err)return reject(err)
            reslove(result)
        })
    })
}

const upsert = async (table, payload) => new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [payload, payload], (error, data) => {
      if (error) {
        return reject(error)
      }
      resolve(data)
    })
  })

function query(table, query, join) {
    let joinQuery = ''

    if(join){
        const key = Object.keys(join)[0]
        const val = join[key]
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`
    }

    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`,query, (err, res) =>{
            if(err) return reject(err)
            resolve(res[0] || null)
        })
    })
}

module.exports = {
    list,
    get,
    upsert,
    query,
}
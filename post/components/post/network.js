const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

router.get('/', list)
router.get('/:id', get)
router.post('/', upsert)

//Internal functions
function list ( req, res, next ){
    controller.list()
        .then((list) => {
            response.success( req, res, list, 200 )
        })
        .catch(next)
}

function upsert ( req, res, next ){
    controller.upsert(req.body)
        .then((user) => {
            response.success( req, res, user, 201 )
        })
        .catch(next)
}

function get ( req, res ){
    controller.get(req.params.id)
        .then((user) => {
            response.success( req, res, user, 200 )
        })
        .catch(err => {
            response.error( req, res, err.message, 500 )  
        })
}

module.exports = router
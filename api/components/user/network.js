const express = require('express')

const secure = require('./secure')
const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

router.get('/', list)
router.post('/follow/:id', secure('follow'), follow)
router.get('/:id/following', following)
router.get('/:id', get )
router.post('/', upsert )
router.put('/', secure('update'), upsert )


//Internal functions
function list ( req, res ){
    controller.list()
        .then((list) => {
            response.success( req, res, list, 200 )
        })
        .catch((err) => {
            response.error( req, res, err.message, 500 )  
        })
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

function upsert ( req, res ){
    controller.upsert(req.body)
        .then((user) => {
            response.success( req, res, user, 201 )
        })
        .catch(err => {
            response.error( req, res, err.message, 500 )  
        })
}

function follow(req, res , next) {
    controller.follow(req.user.id, req.params.id)
        .then(data => {
            response.success(req, res, data, 201)
        })
        .catch(next)
    
}

function following(req, res , next) {
    controller.following(req.params.id)
        .then(data => {
            response.success(req, res, data, 200)
        })
        .catch(next)
    
}

module.exports = router
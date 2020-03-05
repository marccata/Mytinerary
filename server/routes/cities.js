const express = require('express')

const router = express.Router()

router.get('/test', (req, res) => {
    res.send({ msg: 'Cities test route.' })

})

router.get('/all', (req, res) => {
    res.send({ msg: 'Citites to be sended.'})
})

module.exports = router
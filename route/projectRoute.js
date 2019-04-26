const express = require('express')
const db = require('../data/helpers/projectModel')

const router = express.Router()

router.get('/', async (req, res) =>{
	try{
		const list = await  db.get()
		res.status(200).send(list)
	}catch(err){
		res.status(500).send({error: "Error retrieving list"})
	}
})


router.post('/', async (req, res) =>{

})

router.put('/:id', async (req, res) =>{

})

router.delete('/:id', async (req, res) =>{

})

router.get('/:id/acitons', async (req, res) =>{

})

module.exports = router

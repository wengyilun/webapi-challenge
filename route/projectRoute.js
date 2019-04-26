const express = require('express')
const db = require('../data/helpers/projectModel')

const router = express.Router()

router.get('/', async (req, res) =>{
	try{
		const list = await db.get()
		res.status(200).send(list)
	}catch(err){
		res.status(500).send({error: "Error retrieving list"})
	}
})


router.post('/', async (req, res) =>{
	try{
		if(req.body && !req.body.name || req.body && !req.body.description){
			res.status(401).send({message: "Name and description fields cannot be blank"})
		}
		const item = await db.insert(req.body)
		res.status(201).send(item)
	}catch(err){
		res.status(500).send({error: "Error adding project"})
	}
})

router.put('/:id', async (req, res) =>{

})

router.delete('/:id', async (req, res) =>{

})

router.get('/:id/acitons', async (req, res) =>{

})

module.exports = router

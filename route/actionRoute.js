const express = require('express')
const db = require('../data/helpers/actionModel')

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
	try{
		if( !req.body.project_id || !req.body.description ||  !req.body.notes){
			res.status(401).send({message: "Project id and description fields cannot be blank"})
		}
		const item = await db.insert(req.body)
		res.status(201).send(item)
	}catch(err){
		res.status(500).send({error: "Error adding action"})
	}
})
router.put('/:id', async (req, res) =>{

})

router.delete('/:id', async (req, res) =>{

})

module.exports = router

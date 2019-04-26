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
		if(item){
			res.status(201).send(item)
		}else{
			res.status(404).send({message: "Project with that id cannot be found"})
		}
	}catch(err){
		res.status(500).send({error: "Error adding action"})
	}
})
router.put('/:id', async (req, res) =>{
	try{
		if( !req.body.project_id || !req.body.description ||  !req.body.notes){
			res.status(401).send({message: "Project id and description fields cannot be blank"})
		}
		const item = await db.update(req.params.id, req.body)
		if(item){
			res.status(201).send(item)
		}else{
			res.status(404).send({message: "Action with that id cannot be found"})
		}
	}catch(err){
		res.status(500).send({error: "Error updating action"})
	}
})


router.delete('/:id', async (req, res) =>{
	try {
		const count = await db.remove(req.params.id)
		if (count > 0) {
			res.status(200).json({ message: 'The action has been deleted' });
		} else {
			res.status(404).json({ message: "Action with that id cannot be found"})
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({error: "Error deleting action"})
	}
})

module.exports = router

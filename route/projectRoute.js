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
	try{
		if(req.body && !req.body.name || req.body && !req.body.description){
			res.status(401).send({message: "Name and description fields cannot be blank"})
		}
		const item = await db.update(req.params.id, req.body)
		if(item){
			res.status(201).send(item)
		}else{
			res.status(404).send({message: "Project with that id cannot be found"})
		}
	}catch(err){
		res.status(500).send({error: "Error updating project"})
	}
})

router.delete('/:id', async (req, res) =>{
	try {
		const count = await db.remove(req.params.id)
		if (count > 0) {
			res.status(200).json({ message: 'The Project has been deleted' });
		} else {
			res.status(404).json({ message: "Project with that id cannot be found"})
		}
	} catch (error) {
		console.log(error);
		 res.status(500).send({error: "Error deleting project"})
	}
})

router.get('/:id/actions', async (req, res) =>{
	db.getProjectActions(req.params.id)
	.then( messages => {
		res.status(200).json(messages)
	})
	.catch(err =>{
		res.status(500).json(err)
	})
})

module.exports = router

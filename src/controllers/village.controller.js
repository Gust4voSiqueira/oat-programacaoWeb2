const Village = require('../models/village.model')

const save = async (req, res, next) => {
    try {
        const data = req.body
        const newVillage = new Village(data)
        const savedVillage = await newVillage.save()
        if(!savedVillage) {
            throw new Error('Village cold not be saved')
        }
        res.status(201).json({
            message: `Village ${savedVillage.name} created!`
        })
        
    } catch(err) {
        next(err)
    }
}

const getAll = async (req, res, next) => {
    try {
        const villages = await Village.find()
        res.status(200).json(villages)
    } catch(err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const id = req.params.id
        const village = await Village.findById(id)
        if(!village) {
            throw new Error(`Village with id ${id} not found`)
        }
        res.status(200).json(village)
    } catch(err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = req.body

        const village = await Village.findById(id)
        if(!village) {
            throw new Error(`Village with id ${id} not found`)
        }

        debugger

        const newVillage = await Village.findByIdAndUpdate(id, data, {new: true})
        res.status(200).json(newVillage)
    } catch(err) {
        next(err)
    }
}

const remove = async (req, res, next) => {
    try {
        const id = req.params.id
        const village = await Village.findById(id)
        if(!village) {
            throw new Error(`Village with id ${id} not found`)
        }
        await Village.findByIdAndDelete(id)
        res.status(200).json({message: `Village with id ${id} has deleted`})
    } catch(err) {
        next(err)
    }
}

module.exports = {
    save,
    getAll,
    getById,
    update,
    remove
}
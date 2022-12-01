const Clan = require('../models/clan.model')

const save = async (req, res, next) => {
    try {
        const data = req.body
        const newClan = new Clan(data)
        const savedClan = await newClan.save()
        if(!savedClan) {
            throw new Error('Clan cold not be saved')
        }
        res.status(201).json({
            message: `Clan ${savedClan.name} created!`
        })
        
    } catch(err) {
        next(err)
    }
}

const getAll = async (req, res, next) => {
    try {
        const clans = await Clan.find()
        res.status(200).json(clans)
    } catch(err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const id = req.params.id
        const clan = await Clan.findById(id)
        if(!clan) {
            throw new Error(`Clan with id ${id} not found`)
        }
        res.status(200).json(clan)
    } catch(err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = req.body

        const clan = await Clan.findById(id)
        if(!clan) {
            throw new Error(`Clan with id ${id} not found`)
        }

        debugger

        const newClan = await Clan.findByIdAndUpdate(id, data, {new: true})
        res.status(200).json(newClan)
    } catch(err) {
        next(err)
    }
}

const remove = async (req, res, next) => {
    try {
        const id = req.params.id
        const clan = await Clan.findById(id)
        if(!clan) {
            throw new Error(`Clan with id ${id} not found`)
        }
        await Clan.findByIdAndDelete(id)
        res.status(200).json({message: `Clan with id ${id} has deleted`})
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
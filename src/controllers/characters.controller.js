const Character = require('../models/character.model')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const constants = require('../utils/constants')

const save = async (req, res, next) => {
    try {
        const data = req.body

        const hash = await bcrypt.hash(data.password, 10)
        data.password = hash
        
        const character = new Character(data)

        const characterUser = await character.save()

        if (!characterUser) {
            throw Error('Character could not be saved')
        }
        res.status(201).json({
            message: 'New Character created'
        })
    } catch (err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const id = req.params.id
        const character = await Character.findById(id)
        if (!character) {
            throw new Error(`User with id ${id} not found`)
        }

        character.password = undefined
        res.json(character)
    } catch (err) {
        next(err)
    }
}

const getAll = async (req, res, next) => {
    try {
        const characters = await Character.find()
        for (let character of characters) {
            character.password = undefined
        }
        res.json(characters)
    } catch (err) {
        next(err)
    }
}

const authenticate = async (req, res, next) => {
    try {
        const { username, password } = req.body

        if (!(username && password)) {
            throw new Error('username and password are required')
        }

        const character = await Character.findOne({ username })

        if (character && (await bcrypt.compare(password, character.password))) {
            const token = jwt.sign({
                sub: character._id,
                iss: constants.security.iss,
                username: character.username,
                name: character.name,
                profiles: character.profiles
            }, constants.security.secret, {
                expiresIn: constants.security.expires
            })

            res.status(200).json(token)
        } else {
            throw new Error('username and password invalid')
        }
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = req.body
        const character = await Character.findById(id)
        if (!character) {
            throw new Error(`User with id ${id} not found`)
        }
        data.password = character.password
        const newCharacter = await Character.findByIdAndUpdate(id, data, { new: true })
        newCharacter.password = undefined
        res.json(newCharacter)
    } catch (err) {
        next(err)
    }
}

const remove = async (req, res, next) => {
    try {
        const id = req.params.id
        const character = await Character.findById(id)
        if (!character) {
            throw new Error(`User with id ${id} not found`)
        }
        await Character.findByIdAndDelete(id)
        res.json({ message: `User with id ${id} has deleted` })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    save,
    getAll,
    authenticate,
    getById,
    update,
    remove
}
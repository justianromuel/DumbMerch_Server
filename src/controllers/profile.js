const { profile, user } = require('../../models')

exports.addProfile = async (req, res) => {
    try {
        const data = req.body

        let newProfile = await profile.create({
            ...data,
            image: req.file.filename,
            idUser: req.user.id,
        })

        let profileData = await profile.findOne({
            where: {
                id: newProfile.id
            },
            include: [
                {
                    model: user,
                    as: 'user',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password'],
                    },
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updateAt', 'idUser']
            }
        })

        profileData = JSON.parse(JSON.stringify(profileData))

        res.send({
            status: 'success',
            data: {
                profile: {
                    ...profileData,
                    image: process.env.FILE_PATH + profileData.image
                }
            }
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getProfile = async (req, res) => {
    try {
        const idUser = req.user.id

        let data = await profile.findOne({
            where: {
                idUser,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        })

        data = JSON.parse(JSON.stringify(data))

        data = {
            ...data,
            image: process.env.FILE_PATH + data.image
        }

        res.send({
            status: 'success',
            data,
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error',
        })
    }
}

exports.updateProfile = async (req, res) => {
    try {
        let { id } = req.params
        const dataExist = await profile.findOne({
            where: { id }
        })

        if (!dataExist) {
            return res.send({
                message: `Product with id: ${id} not found!`
            })
        }

        let data = {
            phone: req.body.phone,
            gender: req.body.gender,
            address: req.body.address,
            image: req.file.filename,
            idUser: req.user.id
        }

        await profile.update(data, {
            where: {
                id,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            }
        })

        res.send({
            status: 'success',
            data: {
                profile: {
                    ...data,
                    image: process.env.FILE_PATH + data.image
                }
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error',
        })
    }
}
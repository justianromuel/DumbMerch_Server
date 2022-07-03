const { profile, user } = require('../../models')

exports.getProfile = async (req, res) => {
    try {
        const idUser = req.user.id

        let data = await profile.findOne({
            where: {
                idUser,
            },
            include: [
                {
                    model: user,
                    as: 'user',
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt', 'password'],
                    },
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        })

        data = JSON.parse(JSON.stringify(data))

        data = {
            ...data,
            image: process.env.FILE_PATH + data?.image
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
        let id = req.user.id
        const dataExist = await profile.findOne({
            where: { idUser: id }
        })

        if (!dataExist) {
            return res.send({
                message: `Profile with idUser: ${id} not found!`
            })
        }

        let data = {
            phone: req?.body?.phone,
            gender: req?.body?.gender,
            address: req?.body?.address,
            image: req?.file?.filename,
        }

        await user.update({ name: req?.body?.name }, {
            where: {
                id: id
            }
        })

        await profile.update(data, {
            where: { idUser: id },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            }
        })

        let profileData = await profile.findOne({
            where:
                { idUser: id },
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
                exclude: ['createdAt', 'updatedAt'],
            },
        })

        res.send({
            status: 'success',
            data: {
                profile: {
                    profileData,
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
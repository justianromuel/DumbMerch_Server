const { user, product } = require('../../models')

// exports.addUsers = async (req, res) => {
//     try {
//         await user.create(req.body)

//         res.send({
//             status: 'success',
//             message: 'Add user success'
//         })
//     } catch (error) {
//         console.log(error)
//         res.send({
//             status: 'failed',
//             message: 'Server Error'
//         })
//     }
// }

exports.getUsers = async (req, res) => {
    try {
        const users = await user.findAll({
            include: [
                {
                    model: product,
                    as: "products",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
            ],
            attributes: {
                exclude: ["password", "createdAt", "updatedAt"],
            },
        })

        res.send({
            status: "success",
            data: {
                users,
            },
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: "failed",
            message: "Server Error",
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params

        const data = await user.findOne({
            where: {
                id,
            },
            include: {
                model: product,
                as: "products",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            attributes: {
                exclude: ["password", "createdAt", "updatedAt"],
            }
        })

        res.send({
            status: "success",
            data: {
                user: data
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: "failed",
            message: "Server Error",
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params

        const dataExist = await user.findOne({
            where: { id }
        })

        if (!dataExist) {
            return res.send({
                message: `User with id: ${id} not found!`
            })
        }

        await user.update(req.body, {
            where: { id }
        })

        res.send({
            status: 'success',
            message: `Update user id: ${id} success`,
            data: req.body
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: "failed",
            message: "Server Error",
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        const dataExist = await user.findOne({
            where: { id }
        })

        if (!dataExist) {
            return res.send({
                message: `User with id: ${id} not found!`
            })
        }

        await user.destroy({
            where: { id }
        })

        res.send({
            status: 'success',
            message: `Delete user id: ${id} success`
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: "failed",
            message: "Server Error",
        })
    }
}
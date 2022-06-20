const { category, categoryProducts } = require('../../models')

exports.addCategory = async (req, res) => {
    try {
        const data = req.body

        const newCategory = await category.create(data)

        res.send({
            status: 'success',
            message: 'Add category Success',
            data: {
                category: {
                    id: newCategory.id,
                    name: newCategory.name
                }
            },
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error',
        })
    }
}

exports.getCategories = async (req, res) => {
    try {
        const categories = await category.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        })

        if (!categories.length) {
            return res.send({
                message: 'There is no data, please add new data!.'
            })
        }

        res.send({
            status: 'success',
            message: 'Get category Success',
            data: {
                categories,
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

exports.getDetailCategory = async (req, res) => {
    try {
        const { id } = req.params

        const dataExist = await category.findOne({
            where: { id }
        })

        if (!dataExist) {
            return res.send({
                message: `Category with id: ${id} not found!`
            })
        }

        let data = await category.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        })

        res.send({
            status: 'success',
            data: {
                category: data
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

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params

        const dataExist = await category.findOne({
            where: { id }
        })

        if (!dataExist) {
            return res.send({
                message: `Category with id: ${id} not found!`
            })
        }

        const data = req.body

        await category.update(data, {
            where: {
                id,
            },
        })

        res.send({
            status: 'success',
            data: {
                category: {
                    id: id,
                    name: data.name
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

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params

        const dataExist = await category.findOne({
            where: { id }
        })

        if (!dataExist) {
            return res.send({
                message: `Category with id: ${id} not found!`
            })
        }

        await category.destroy({
            where: {
                id,
            },
        })

        res.send({
            status: "success",
            message: `Delete category id: ${id} finished`,
            data: {
                id,
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
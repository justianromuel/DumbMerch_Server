const { product, user } = require('../../models')

exports.addProduct = async (req, res) => {
    try {
        const data = req.body

        let newProduct = await product.create({
            ...data,
            image: req.file.filename,
            idUser: req.user.id,
        })

        let productData = await product.findOne({
            where: {
                id: newProduct.id
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
                exclude: ['createdAt', 'updatedAt', 'idUser'],
            }
        })

        productData = JSON.parse(JSON.stringify(productData))

        res.send({
            status: 'success',
            data: {
                product: {
                    ...productData,
                    image: process.env.FILE_PATH + productData.image
                }
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

exports.getProducts = async (req, res) => {
    try {
        let products = await product.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt", "idUser"],
            },
        })

        products = JSON.parse(JSON.stringify(products))
        products = products.map((item) => {
            return {
                ...item,
                image: process.env.FILE_PATH + item.image
            }
        })

        if (!products.length) {
            return res.send({
                message: 'There is no data, please add new data!.'
            })
        }

        res.send({
            status: 'success',
            data: {
                products
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

exports.getDetailProduct = async (req, res) => {
    try {
        const { id } = req.params

        let data = await product.findOne({
            where: { id },
            attributes: {
                exclude: ["createdAt", "updatedAt", "idUser"],
            },
        })

        data.image = process.env.FILE_PATH + data.image

        res.send({
            status: "success",
            data: {
                product: data
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

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params

        const dataExist = await product.findOne({
            where: { id }
        })

        if (!dataExist) {
            return res.send({
                message: `Product with id: ${id} not found!`
            })
        }

        const data = {
            name: req.body.name,
            desc: req.body.desc,
            image: req.file.filename,
            price: req.body.price,
            qty: req.body.qty,
            idUser: req.user.id
        }

        await product.update(data, {
            where: {
                id
            },
            attributes: {
                exclude: ["password", "idUser", "createdAt", "updatedAt"],
            },

        })

        res.send({
            status: "success",
            product: {
                data
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

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        const dataExist = await product.findOne({
            where: { id }
        })

        if (!dataExist) {
            return res.send({
                message: `Product with id: ${id} not found!`
            })
        }

        await product.destroy({
            where: {
                id,
            },
        })

        res.send({
            status: "success",
            message: `Delete product id: ${id} finished`,
            data: {
                id
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
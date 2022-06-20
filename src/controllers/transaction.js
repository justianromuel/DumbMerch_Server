// import models here
const { transaction, product, user } = require("../../models")

exports.addTransaction = async (req, res) => {
    try {
        const data = req.body

        let newTransaction = await transaction.create({
            ...data,
            idBuyer: req.user.id,
            status: 'pending'
        })

        let transactionData = await transaction.findOne({
            where: {
                id: newTransaction.id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'status'],
            }
        })

        res.send({
            status: 'success',
            message: 'Add transaction Success',
            data: {
                transaction: transactionData
            }
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getTransactions = async (req, res) => {
    try {
        const data = await transaction.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idBuyer', 'idSeller', 'idProduct']
            },
            include: [
                {
                    model: product,
                    as: "products",
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'idUser', 'qty', 'price']
                    }
                },
                {
                    model: user,
                    as: "buyer",
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'status']
                    }
                },
                {
                    model: user,
                    as: "seller",
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'status']
                    }
                }
            ]
        })

        res.send({
            status: 'success',
            data: {
                transaction: data
            }
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}
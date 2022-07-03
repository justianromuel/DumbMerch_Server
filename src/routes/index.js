const express = require('express')
const router = express.Router()

// Controller:
const {
    register,
    login,
    checkAuth
} = require('../controllers/auth')
const {
    // addUsers,
    getUsers,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/user')
const {
    addProduct,
    getProducts,
    getDetailProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product')
const {
    addCategory,
    getCategories,
    getDetailCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/category')
const {
    addTransaction,
    getTransactions,
    notification
} = require('../controllers/transaction')
const {
    addProfile,
    getProfile,
    updateProfile
} = require('../controllers/profile')

// Middleware:
// Authentication
const { auth } = require('../middlewares/auth')

// Upload File
const { uploadFile } = require('../middlewares/uploadFile')

// Route:
// Auth
router.post('/register', register)
router.post('/login', login)
router.get('/check-auth', auth, checkAuth)

// User
// router.post('/user', addUsers)
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

// Product
router.post('/product', auth, uploadFile('image'), addProduct)
router.get('/products', getProducts)
router.get('/product/:id', auth, getDetailProduct)
router.patch('/product/:id', auth, uploadFile('image'), updateProduct)
router.delete('/product/:id', auth, deleteProduct)

// Category
router.post('/category', auth, addCategory)
router.get('/categories', getCategories)
router.get('/category/:id', auth, getDetailCategory)
router.patch('/category/:id', auth, updateCategory)
router.delete('/category/:id', auth, deleteCategory)

// Transaction
router.post('/transaction', auth, addTransaction)
router.get('/transactions', auth, getTransactions)
router.post('/notification', notification)

// Profile
// router.post('/profile', auth, uploadFile('image'), addProfile)
router.get('/profile', auth, getProfile)
router.patch('/profile', auth, uploadFile('image'), updateProfile)

module.exports = router
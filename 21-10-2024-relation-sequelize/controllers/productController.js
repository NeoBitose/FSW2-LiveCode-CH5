const { Products } = require("../models");

const createProduct = async (req, res) => {
    const {name, stock, price} = req.body;

    try {
        const newProduct = await Products.create({
            name,
            stock,
            price
        })

        res.status(201).json({
            status: "Success",
            message: "Success create new product",
            isSuccess: true,
            data: {
                newProduct
            }
        })
    } catch (error) {        
        console.log(error.name)
        if (error.name === 'SequelizeValidationError') {
            const errorMessage = error.errors.map(err => err.message)
            return res.status(400).json({
                status: "Fail",
                message: errorMessage[0],
                isSuccess: false,
                data: null
            })
        }

        res.status(500).json({
            status: "Fail",
            message: error.message,
            isSuccess: false,
            data: null
        })
    }
}

const getAllProduct = async (req, res) => {
    try {
        console.log("hello")
        const products = await Products.findAll()
        console.log(products)

        res.status(200).json({
            status: "Success",
            message: "Success get products data",
            isSuccess: true,
            data: {
                products
            }
        })
    } catch (error) {        
        console.log(error.name)
        if (error.name === 'SequelizeValidationError') {
            const errorMessage = error.errors.map(err => err.message)
            return res.status(400).json({
                status: "Fail",
                message: errorMessage[0],
                isSuccess: false,
                data: null
            })
        }

        res.status(500).json({
            status: "Fail",
            message: error.message,
            isSuccess: false,
            data: null
        })
    }
}

const getProductById = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Products.findOne({
            where: {
                id
            }
        })

        res.status(200).json({
            status: "Success",
            message: "Success get product data",
            isSuccess: true,
            data: {
                product
            }
        })
    } catch (error) {        
        console.log(error.name)
        if (error.name === 'SequelizeValidationError') {
            const errorMessage = error.errors.map(err => err.message)
            return res.status(400).json({
                status: "Fail",
                message: errorMessage[0],
                isSuccess: false,
                data: null
            })
        }

        res.status(500).json({
            status: "Fail",
            message: error.message,
            isSuccess: false,
            data: null
        })
    }
}

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const {name, stock, price} = req.body

    try {
        const product = await Products.findOne({
            where: {
                id
            }
        })

        if(!product) {
            res.status(404).json({
                status: "Fail",
                message: "Data not found",
                isSuccess: false,
                data: null
            })
        }

        await Products.update({
            name,
            price,
            stock
        })

        res.status(200).json({
            status: "Success",
            message: "Success update product",
            isSuccess: true,
            data: {
                product: {
                    id,
                    name,
                    stock,
                    price
                }
            }
        })
    } catch (error) {        
        console.log(error.name)
        if (error.name === 'SequelizeValidationError') {
            const errorMessage = error.errors.map(err => err.message)
            return res.status(400).json({
                status: "Fail",
                message: errorMessage[0],
                isSuccess: false,
                data: null
            })
        }

        res.status(500).json({
            status: "Fail",
            message: error.message,
            isSuccess: false,
            data: null
        })
    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Products.findOne({
            where: {
                id
            }
        })

        if(!product) {
            res.status(404).json({
                status: "Fail",
                message: "Data not found",
                isSuccess: false,
                data: null
            })
        }

        await Products.destroy()

        res.status(200).json({
            status: "Success",
            message: "Success delete product",
            isSuccess: true,
            data: null
        })
    } catch (error) {        
        console.log(error.name)
        if (error.name === 'SequelizeValidationError') {
            const errorMessage = error.errors.map(err => err.message)
            return res.status(400).json({
                status: "Fail",
                message: errorMessage[0],
                isSuccess: false,
                data: null
            })
        }

        res.status(500).json({
            status: "Fail",
            message: error.message,
            isSuccess: false,
            data: null
        })
    }
}

module.exports = {
    createProduct, 
    getAllProduct, 
    getProductById, 
    updateProduct, 
    deleteProduct
}
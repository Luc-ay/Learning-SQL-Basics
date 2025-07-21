import express from 'express'
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getProductsByCategory,
  updateProduct,
} from '../controllers/productController.js'

const router = express.Router()

router.post('/', createProduct)
router.get('/', getProducts)
router.get('/:id', getProductById)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)
router.get('/categrory/:categoryId', getProductsByCategory)

export default router

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createProduct = async (req, res) => {
  try {
    const categoryId = Number(req.body.categoryId)
    if (!req.body.name) {
      return res.status(422).json({ error: 'Name is required' })
    }

    if (!req.body.price) {
      return res.status(422).json({ error: 'Price is required' })
    } else {
      if (typeof req.body.price !== 'number' || req.body.price < 0) {
        return res.status(422).json({ error: 'Price must be greater than 0' })
      }
    }

    if (!categoryId) {
      return res.status(422).json({ error: 'Category id is required' })
    } else {
      if (!(await prisma.category.findUnique({ where: { id: categoryId } }))) {
        return res.status(404).json({ error: 'Category Id not found' })
      }
    }

    const newProduct = await prisma.product.create({
      data: req.body,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      omit: {
        categoryId: true,
      },
    })

    return res.status(201).json(newProduct)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      omit: {
        categoryId: true,
      },
    })

    return res.status(200).json(products)
  } catch (error) {
    return res.status(500).json({ Error: error.message })
  }
}

export const getProductById = async (req, res) => {
  try {
    const productId = Number(req.params.id)
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      omit: {
        categoryId: true,
      },
    })

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    return res.status(200).json(product)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const updateProduct = async (req, res) => {
  try {
    if (req.body.name !== undefined && req.body.name.trim() === '') {
      return res.status(422).json({ error: 'Name cannot be empty' })
    }

    if (
      req.body.price !== undefined &&
      (typeof req.body.price !== 'number' || req.body.price < 0)
    ) {
      return res.status(422).json({ error: 'Price must be greater than 0' })
    }
    if (
      req.body.categoryId !== undefined &&
      !(await prisma.category.findUnique({
        where: { id: req.body.categoryId },
      }))
    ) {
      return res.status(404).json({ error: 'Category not found' })
    }

    const updatedProduct = await prisma.product.update({
      data: req.body,
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      omit: {
        categoryId: true,
      },
    })

    return res.status(200).json(updatedProduct)
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Products not found' })
    }
    return res.status(500).json({ error: error.message })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    await prisma.product.delete({
      where: {
        id: parseInt(req.params.id),
      },
    })

    return res.status(204).send()
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = Number(req.params.categoryId)
    if (!(await prisma.category.findUnique({ where: { id: categoryId } }))) {
      return res.status(404).json({ error: 'Category id not found' })
    }

    const products = await prisma.product.findMany({
      where: {
        categoryId: categoryId,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      omit: {
        categoryId: true,
      },

      orderBy: {
        name: 'asc',
      },
    })

    return res.status(200).json(products)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

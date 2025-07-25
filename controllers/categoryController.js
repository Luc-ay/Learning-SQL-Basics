import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createCategory = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(422).json({ error: 'Name is required' })
    }

    if (await prisma.category.findUnique({ where: { name: req.body.name } })) {
      return res
        .status(422)
        .json({ error: `${req.body.name} category already exists` })
    }

    const newCategory = await prisma.category.create({
      data: {
        name: req.body.name,
      },
    })

    return res.status(201).json({ newCategory })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany()

    return res.status(200).json(categories)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const updateCategory = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id)

    if (
      !(await prisma.category.findUnique({
        where: { id: categoryId },
      }))
    ) {
      return res.status(404).json({ error: 'Category not Found' })
    }

    if (!req.body.name) {
      return res.status(422).json({ error: 'Name is required' })
    }

    if (
      await prisma.category.findUnique({
        where: { name: req.body.name },
      })
    ) {
      return res
        .status(422)
        .json({ error: `${req.body.name} category already exists` })
    }

    const updatedCategory = await prisma.category.update({
      data: {
        name: req.body.name,
      },
      where: {
        id: categoryId,
      },
    })

    return res.status(200).json(updatedCategory)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const deleteCategory = async (req, res) => {
  try {
    const categoryId = Number(req.params.id)
    if (!(await prisma.category.findUnique({ where: { id: categoryId } }))) {
      return res.status(404).json({ error: `Category does not exist` })
    }

    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    })

    return res.status(204).send()
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

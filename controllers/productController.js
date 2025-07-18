import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const createProduct = async (req.res) => {
 try {
  
 } catch (error) {
  return res.status(500).json({error: error.message})
 }
}
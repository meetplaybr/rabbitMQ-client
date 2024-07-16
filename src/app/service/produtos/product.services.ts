import { api } from '../axios'
interface Product {
  id: string,
  userId: string,
  authorId: string,
  preco: string,
  nome: string,
  descricao: string
  statas: string
}
export const getProducts = async () => {
  try {
    const {
      data: { data = []},
    } = await api.get("/product")
    return {data, error: false}
  } catch (error) {
    return { data: [], error: true};
  }
}
export const createProduct = async (body: Product) => {
  try {
    const {
      data: {data=[], message, error},
    } = await api.post("/product", body)
    return {data, message, error}
  } catch (error: any) {
    return { data: [], message: error.message, error: true}
  }
}
export const productReaction = async (body: Product) => {
  try {
    const {
      data: {data=[], message, error},
    } = await api.post(`/product/${body.id}`, body)
    return {data, message, error}
  } catch (error: any) {
    return { data: [], message: error.message, error: true}
  }
}
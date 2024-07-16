import { NextApiResponseServerIo } from '@/types/types';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function hendler(req: NextApiRequest, res: NextApiResponseServerIo){
  if(req.method !== 'POST'){
    return res.status(405).json({erro: "Método não encontrado"})
  }
  try {
   

    res?.socket?.server?.io?.emit("firstEvent", "Hello this is first teste!")
  } catch (error) {
    console.log("[MESSAGE POS] :", error)
    return res.status(500).json({message: "Internal error"})
  }
}
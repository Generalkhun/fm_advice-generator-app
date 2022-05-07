// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios, { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { endpointsForBackend } from '../../config';

// example api response
//{"slip": { "id": 113, "advice": "Lemon and salt works wonders on tarnished brass."}}
interface AdviceDataRespose {
  slip: {
    id: number;
    advice: string;
  }
}
export interface AdviceServiceAPIRespose {
  id: string;
  advice: string;
}

const advice = async (
  req: NextApiRequest,
  res: NextApiResponse<AdviceServiceAPIRespose>
) => {
  const adviceDataResponse: AxiosResponse<AdviceDataRespose> = await axios({
    method: 'get',
    url: endpointsForBackend.randomAdviceAPIEndpoints,
  })
  res.status(200).json({
    id: adviceDataResponse.data.slip.id.toString(),
    advice: adviceDataResponse.data.slip.advice,
  })
}

export default advice
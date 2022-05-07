import axios, { AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import { useCallback, useState } from 'react'
import { endpointsForFrontend } from '../config'
import { AdviceServiceAPIRespose } from './api/advice'

const Home: NextPage = () => {
  const [adviceMessage, setAdviceMessage] = useState<string>('')
  const [adviceId, setAdviceId] = useState<string>('')
  const fetchAdviceData = useCallback(async () => {
    const adviceData: AxiosResponse<AdviceServiceAPIRespose> = await axios({
      url: endpointsForFrontend.adviceAPIEndpoints,
      method: 'get'
    })
    setAdviceId(adviceData.data.id)
    setAdviceMessage(adviceData.data.advice)
  }, [])

  return (
    <div>
      <button onClick={fetchAdviceData}>fetch new advice</button>

      <div>{`current advice id: ${adviceId}`}</div>
      <div>{`current advice message: ${adviceMessage}`}</div>


    </div>
  )
}

export default Home

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
    <div className='bg-dark-blue h-screen flex'>
      <div className='content-center p-20 m-24 bg-grayish-blue rounded-lg'>
        <div>{`Advice # ${adviceId}`}</div>
        <div>{`"${adviceMessage}"`}</div>
        <button className='bg-neon-green rounded-full flex items-center justify-center hover:backdrop-blur-md' style={{height: '100px', width: '100px'}} onClick={fetchAdviceData}>a</button>
      </div>
    </div>
  )
}

export default Home

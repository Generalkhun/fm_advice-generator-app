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

  /**
   * @todo
   * 1. conditionally render pattern divider based on screen width
   * 2. adjust color based on the sample design (not a guided one)
   */

  return (
    <div className='bg-dark-blue h-screen flex justify-center items-center'>
      <div className='h-[330px] w-[540px] bg-dark-grayish-blue rounded-lg flex flex-col items-center'>
        <p className='mt-12 pb-8 font-sans font-extrabold text-neon-green'>{`ADVICE #${adviceId}`}</p>
        <div className='h-[147px] px-13 text-light-cyan'>{`"${adviceMessage}"`}</div>
        <img className='pb-9' src='/pattern-divider-desktop.svg' />
        <div className='h-px'>
          <button className='bg-neon-green rounded-full flex items-center justify-center hover:backdrop-blur-md' style={{ height: '63px', width: '63px' }} onClick={fetchAdviceData}>a</button>
        </div>
      </div>

    </div>
  )
}

export default Home

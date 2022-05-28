import axios, { AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import { useCallback, useState } from 'react'
import { endpointsForFrontend } from '../config'
import { AdviceServiceAPIRespose } from './api/advice'

const Home: NextPage = () => {
  const [adviceMessage, setAdviceMessage] = useState<string>('')
  const [adviceId, setAdviceId] = useState<string>('')
  const [isGetAdviceBtnHovered, setIsGetAdviceBtnHovered] = useState<boolean>(false)
  const fetchAdviceData = useCallback(async () => {
    const adviceData: AxiosResponse<AdviceServiceAPIRespose> = await axios({
      url: endpointsForFrontend.adviceAPIEndpoints,
      method: 'get'
    })
    setAdviceId(adviceData.data.id)
    setAdviceMessage(adviceData.data.advice)
  }, [])
  
  const onHoverBtn = () => {
    setIsGetAdviceBtnHovered(true);
  }

  const onUnHoverBtn = () => {
    setIsGetAdviceBtnHovered(false);
  }

  /**
   * @todo
   * 1. conditionally render pattern divider based on screen width
   * 2. adjust color based on the sample design (not a guided one)
   */

  return (
    <div className='bg-dark-blue h-screen flex justify-center items-center'>
      <div className='h-[330px] w-[540px] bg-dark-grayish-blue rounded-lg flex flex-col items-center'>
        <p className='mt-12 pb-8 font-sans font-extrabold text-neon-green'>{`ADVICE #${adviceId}`}</p>
        <div className='h-[147px] px-14 text-light-cyan'>{`"${adviceMessage}"`}</div>
        <img className='pb-9' src='/pattern-divider-desktop.svg' />
        <div className='relative h-px'>
          {isGetAdviceBtnHovered && <div className='absolute h-[63px] w-[63px] bg-neon-green rounded-full blur-lg'></div>}
          <button onMouseEnter={onHoverBtn} onMouseLeave={onUnHoverBtn} className='relative h-[63px] w-[63px] bg-neon-green rounded-full flex items-center justify-center' onClick={fetchAdviceData}>
            <img src='/icon-dice.svg' />
          </button>
        </div>
      </div>

    </div>
  )
}

export default Home

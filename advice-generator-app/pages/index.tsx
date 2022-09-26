import axios, { AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import { useCallback, useState } from 'react'
import { SkeletonLoadingAdvice } from '../components/SkeletonLoadingAdvice'
import { endpointsForFrontend } from '../config'
import { AdviceServiceAPIRespose } from './api/advice'

const Home: NextPage = () => {
  const [adviceMessage, setAdviceMessage] = useState<string>('')
  const [adviceId, setAdviceId] = useState<string>('')
  const [isGetAdviceBtnHovered, setIsGetAdviceBtnHovered] = useState<boolean>(false)
  const [isLoadingAdvice, setIsLoadingAdvice] = useState<boolean>(false)
  const [isShowErrorLoadingMessage, setIsShowErrorLoadingMessage] = useState<boolean>(false)
  const fetchAdviceData = useCallback(async () => {
    setIsShowErrorLoadingMessage(false)
    setIsLoadingAdvice(true)
    try {
      const adviceData: AxiosResponse<AdviceServiceAPIRespose> = await axios({
        url: endpointsForFrontend.adviceAPIEndpoints,
        method: 'get'
      })
      setAdviceId(adviceData.data.id)
      setAdviceMessage(adviceData.data.advice)
      setIsLoadingAdvice(false)
    } catch (error) {
      console.error(error)
      setIsLoadingAdvice(false)
      setIsShowErrorLoadingMessage(true)
    }
  }, [])

  const onHoverBtn = () => {
    setIsGetAdviceBtnHovered(true);
  }

  const onUnHoverBtn = () => {
    setIsGetAdviceBtnHovered(false);
  }

  return (
    <div className='bg-dark-blue h-screen flex justify-center items-center'>
      <div className='min-h-[330px] w-[540px] bg-dark-grayish-blue rounded-xl flex flex-col items-center'>
        {isLoadingAdvice ? <SkeletonLoadingAdvice />
          :
          <>
            {isShowErrorLoadingMessage ? <p className="mt-10 pb-5 font-['Manrope, sans-serif'] font-[700] text-[13px] tracking-[.3em] text-[crimson]">Something went down, please load an advice again</p> :
              <><p className="mt-10 pb-5 font-['Manrope, sans-serif'] font-[700] text-[13px] tracking-[.3em] text-neon-green">{`ADVICE #${adviceId}`}</p>
                <div className="min-h-[147px] px-14 font-['Manrope, sans-serif'] text-center font-[600] text-[26px] tracking-[.03em] text-light-cyan">{`"${adviceMessage}"`}</div>
                <img className='pb-14' src='/pattern-divider-desktop.svg' />
              </>}
            <div className='relative top-[30px]'>
              {isGetAdviceBtnHovered && <div className='absolute h-[63px] w-[63px] bg-neon-green rounded-full blur-lg'></div>}
              <button onMouseEnter={onHoverBtn} onMouseLeave={onUnHoverBtn} className='relative h-[63px] w-[63px] bg-neon-green rounded-full flex items-center justify-center' onClick={fetchAdviceData}>
                <img src='/icon-dice.svg' />
              </button>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default Home

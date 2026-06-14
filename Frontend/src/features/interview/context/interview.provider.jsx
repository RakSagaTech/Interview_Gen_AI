import {useState} from 'react'
import {InterviewContext} from '../context/interview.context'

export const InterviewProvider = ({children})=>{

  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(false)
  const [reports, setReports] = useState(null)

  return (
    <InterviewContext.Provider value={{report, setReport, loading, setLoading, reports, setReports}}>
      {children}
    </InterviewContext.Provider>
  )
}
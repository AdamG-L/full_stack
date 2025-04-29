import { useEffect, useState } from "react"
import DiaryDisplay from "./Components/DiaryDisplay"
import { createDiary, getDiaries } from "./Services/diaryService"
import { DiaryEntry } from "../../types"
import DiaryForm from "./Components/DiaryForm"
import axios from "axios"

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    getDiaries()
    .then(d => setDiaries(d))
  }, [])

  const handleCreateDiary = async (data: object): Promise<boolean> => {
    try {
      const newDiary = await createDiary(data)
      setDiaries(d => [...d, newDiary])
      return true
    } catch (error: unknown) {
      if (axios.isAxiosError(error)){
        alert(error.response?.data.error[0].message)
      }
      else {
        console.log(error)
      }
      return false
    }
  }

  return (
    <div>
      <DiaryForm handleCreateDiary={handleCreateDiary}/>
      <DiaryDisplay diaries={diaries}/>
    </div>
  )
}

export default App

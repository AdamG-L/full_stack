import { useEffect, useState } from "react"
import DiaryDisplay from "./Components/DiaryDisplay"
import { getDiaries } from "./Services/diaryService"
import { DiaryEntry } from "../../types"

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    getDiaries()
    .then(d => setDiaries(d))
  }, [])

  return (
    <div>
      <DiaryDisplay diaries={diaries}/>
    </div>
  )
}

export default App

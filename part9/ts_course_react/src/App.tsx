import Content from "./components/Content"
import Header from "./components/Header"
import Total from "./components/Total"
import { CoursePart, courseParts } from "./types"

const App = () => {
  const courseName = "Half Stack application development"

  const courses: CoursePart[] = courseParts

  const totalExercises = courses.reduce((sum, part) => sum + part.exerciseCount, 0)

  return (
    <div>
      <Header courseName={courseName}/>
      <Content courses={courses}/>
      <Total total={totalExercises}/>
    </div>
  )
}

export default App
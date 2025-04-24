import { CoursePart } from "../types"
import Part from "./Part"

type ContentProp = {
    courses: CoursePart[],
}

const Content = ({ courses }: ContentProp) => (
    <div>
        {courses.map(c => (
            <Part key={c.name} part={c}/>
        ))}
    </div>
)

export default Content
import { DiaryEntry } from '../../../types'

type DiaryDisplayProp = {
    diaries: DiaryEntry[],
}

const DiaryDisplay = ({diaries}: DiaryDisplayProp) => (
    diaries.map(d => (
        <ul key={d.id}>
            <li>
                Date: {d.date}
            </li>
            <li>
                Weather: {d.weather}
            </li>
            <li>
                Visibility: {d.visibility}
            </li>
        </ul>
    ))
)

export default DiaryDisplay
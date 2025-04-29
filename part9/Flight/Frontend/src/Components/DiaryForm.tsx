import { useState } from "react"
import { Visibility, Weather } from "../../../types"

type DiaryFormProp = {
    handleCreateDiary: (data: object) => Promise<boolean>,
}

const DiaryForm = ({ handleCreateDiary }: DiaryFormProp) => {
    const [date, setDate] = useState("")
    const [weather, setWeather] = useState("")
    const [visibility, setVisibility] = useState("")
    const [comment, setComment] = useState("")

    const onSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        const success = await handleCreateDiary({
            date, weather,
            visibility, comment
        })
        if (success) {
            setDate("")
            setWeather("")
            setVisibility("")
            setComment("")
        }
    }
    return (
        <form onSubmit={onSubmit}>
            Date:
            <input value={date} onChange={({ target }) => setDate(target.value)} />
            <br />
            Weather:
            {Object.values(Weather).map(option => (
                <label key={option}>
                    <input type="radio"
                        name="weather"
                        value={option}
                        checked={weather === option}
                        onChange={({ target }) => setWeather(target.value)} />
                    {option}
                </label>
            ))}
            <br />
            Visibility:
            {Object.values(Visibility).map(option => (
                <label key={option}>
                    <input type="radio"
                        name="visibility"
                        value={option}
                        checked={visibility === option}
                        onChange={({ target }) => setVisibility(target.value)} />
                    {option}
                </label>
            ))}
            <br />
            Comment:
            <input value={comment} onChange={({ target }) => setComment(target.value)} />
            <br />
            <button type="submit">Add Diary</button>
        </form>
    )
}

export default DiaryForm


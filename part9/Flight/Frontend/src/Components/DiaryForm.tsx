import { useState } from "react"

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
        const success = await handleCreateDiary({date, weather, 
            visibility, comment})
        if(success){
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
            <br/>
            Weather:
            <input value={weather} onChange={({ target }) => setWeather(target.value)} />
            <br/>
            Visibility:
            <input value={visibility} onChange={({ target }) => setVisibility(target.value)} />
            <br/>
            Comment:
            <input value={comment} onChange={({ target }) => setComment(target.value)} />
            <br/>
            <button type="submit">Add Diary</button>
        </form>
    )
}

export default DiaryForm


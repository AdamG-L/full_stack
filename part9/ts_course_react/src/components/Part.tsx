import { CoursePart } from "../types"

type PartProp = {
    part: CoursePart,
}

const Part = ({ part }: PartProp) => {
    const basePart = (
        <>
            <b>{part.name}</b><br />
            Exercise Count: {part.exerciseCount} <br />
        </>
    )
    switch (part.kind) {
        case "basic":
            return <p>{basePart}
                Description: {part.description}</p>
        case "group":
            return <p>{basePart}
                Group Project Count: {part.groupProjectCount}</p>
        case "background":
            return <p>{basePart}
                Background Material: {part.backgroundMaterial} <br />
                Description: {part.description}</p>
        default:
            assertNever(part)

    }
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
}

export default Part
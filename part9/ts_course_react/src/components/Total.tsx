type TotalProp = {
    total: number
}

const Total = ({ total }: TotalProp) => (
    <p>
        Number of exercises {total}
    </p>
)

export default Total
const Filter = ({filter, updateFilter}) => {
    return (
        <div>
            Filter by name: <input value={filter} onChange={updateFilter} />
        </div>
    )
}

export default Filter
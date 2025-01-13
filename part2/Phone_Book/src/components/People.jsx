const People = ({ people }) => {
  return (
    <ul>
      {people.map(person =>
        <li key={person.name}>
          {person.name}: {person.number}
        </li>
      )}
    </ul>
  )
}

export default People

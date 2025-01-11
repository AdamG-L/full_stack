const Header = ({ course }) => {
  return (
    <h1>
      {course}
    </h1>
  )
}

const Part = ({ part: { name, exercises } }) => {
  return (
    <p>{name} {exercises}</p>
  )
}

// Note: Use '[]' Tto destructure arrays
const Content = ({ parts }) => 
  parts.map(part =>
    <Part key={part.id} part={part} />
  )



const Total = ({ parts}) => {
  const total = parts.reduce((sum, part) => sum + part['exercises'], 0)
  return (
    <h3>
      Total number of exercises: {total}
    </h3>
  )
}
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course['name']} />
      <Content parts={course['parts']} />
      <Total parts={course['parts']} />
    </div>
  )
}

export default Course
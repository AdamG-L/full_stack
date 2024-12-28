const Header = ({course}) => {
  return (
    <h1>
      {course}
    </h1>
  )
}

const Part = ({part: {name, exercises}}) => {
  return (
    <p>{name} {exercises}</p>
  )
}

// Note: Use '[]' Tto destructure arrays
const Content = ({parts: [part1, part2, part3]}) => {
  return (
    <>
    <Part part={part1}/>
    <Part part={part2}/>
    <Part part={part3}/>
    </>
  )
}

const Total = ({parts: [part1, part2, part3]}) => {
  return (
    <p>
      Total number of exercises: {part1['exercises'] + 
      part2['exercises'] + part3['exercises']}
    </p>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course['name']} />
      <Content parts={course['parts']} />
      <Total parts={course['parts']} />
    </div>
  )
}

export default App
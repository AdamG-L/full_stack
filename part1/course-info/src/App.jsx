/*
Refactor the code so that it consists of three new components: 
Header, Content, and Total. All data still resides in the App
 component, which passes the necessary data to each component
  using props. Header takes care of rendering the name of the
   course, Content renders the parts and their number of exercises
    and Total renders the total number of exercises.

*/
const Header = (props) => {
  return (
    <h1>
      {props.course}
    </h1>
  )
}

const Part = ({part, exercise}) => {
  return (
    <p>{part} {exercise}</p>
  )
}

const Content = ({p1, p2, p3, e1, e2, e3}) => {
  return (
    <>
    <Part part={p1} exercise={e1}/>
    <Part part={p2} exercise={e2}/>
    <Part part={p3} exercise={e3}/>
    </>
  )
}

const Total = (props) => {
  return (
    <p>
      Total number of exercises: {props.e1 + props.e2 + props.e3}
    </p>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content
        p1={part1} e1={exercises1}
        p2={part2} e2={exercises2}
        p3={part3} e3={exercises3}
      />
      <Total e1={exercises1} e2={exercises2} e3={exercises3} />
    </div>
  )
}

export default App
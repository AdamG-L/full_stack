import ReactDOM from 'react-dom/client'

interface WelcomeProps {
  name: string
}

const Welcome = ({name}: WelcomeProps) => {
  return <h1>Hello, {name}</h1>
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Welcome name="Sarah" />
)
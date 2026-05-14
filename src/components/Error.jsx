
import { useRouteError } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'

const Error = () => {
  const error = useRouteError()
  console.log(error)
  return (
    <div className='p-[10%] h-[70svh] space-y-[8%]'>
        <h1 className='text-2xl'>Error: {error.message}</h1>
        <pre className='text-md'>{error.status} - {error.statusText}</pre>
    </div>
  )
}

export default Error
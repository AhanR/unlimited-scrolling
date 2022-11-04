import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from './context'

export default function Home() {

  const {count, setCount} = useContext(Context);

  return (
    <section className=' w-[30vw] h-screen m-auto p-4 grid justify-center content-center gap-y-4 ' >
        <h1 className=' text-white text-4xl '>Slides by Ahan</h1>
        <span className=' text-white'>{count} slides viewed</span>
        <Link to="/view" className='text-white underline '>Watch slides</Link>
    </section>
  )
}

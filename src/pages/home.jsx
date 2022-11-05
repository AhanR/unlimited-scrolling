import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from './context'

export default function Home(props) {

  const {count, setCount} = useContext(Context);
  const width = (window.innerWidth / window.innerHeight < 1 )? window.innerWidth: window.innerWidth*0.4;
  const height = window.innerHeight;

  return (
    <section className=' m-auto p-4 grid justify-center content-center gap-y-4 ' style={{
      width : width,
      height : height
    }} >
        <h1 className=' text-white text-4xl '>Slides by Ahan</h1>
        <span className=' text-white'>{count} slides viewed</span>
        <Link to="/view" className='text-white underline '>
          <button className=' bg-emerald-700 px-4 py-2 rounded-md '>
            view slides
          </button>
        </Link>
    </section>
  )
}

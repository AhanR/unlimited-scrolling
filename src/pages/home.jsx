import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section>
        <h1>Slides by Ahan</h1>
        <span>x slides viewed</span>
        <Link to="/view">Watch slides</Link>
    </section>
  )
}

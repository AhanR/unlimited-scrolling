import React from 'react'
import { useState, useEffect, useContext } from 'react';
import Canvas from './canvas';
import style from './utilities.module.css'
import { Context } from './context';
import { Link } from 'react-router-dom';

export default function Slides() {
    
    const { count, setCount } = useContext(Context);
    // addCanvas(count);

    const width = 0.3;
    const height = 1;
    const minimum = 1;
    const [seed, setSeed] = useState(0);
    const [buffer, setBuffer] = useState([[count,seed]]);
    const [loading, setLoading] = useState(true);

    //setting count to zero on mount
    useEffect(() => {
        setCount(minimum);
    }, [])

    const scroll = evt => {
        const scrollIndex = evt.currentTarget.scrollTop - (count - minimum)* window.innerHeight;
        if (scrollIndex > 0) {
            setLoading(true);
            setCount(count => count + 1);
            addCanvas(count);
        }
    }

    function addCanvas(count) {
        fetch("https://randommer.io/api/SocialNumber",
            {
                method: "GET",
                headers: {
                    "accept": "*/*",
                    "X-Api-Key": "3f9db52d7d814df08f450e3e5ed780c0"
                }
            }
        )
        .then(res => res.text())
        .then(txt => {
            const newSeed = txt.replaceAll("-", "").replaceAll("\"","");
            setSeed(parseInt(newSeed));
            setBuffer(buf => [...buf, [newSeed, count]]);
            setLoading(false);
        });
    }

    return (
        <section
            className={` w-[30vw] h-[100vh] m-auto relative overflow-y-scroll border-x-2 border-white scroll-smooth `}
            onScroll={scroll}
        >
            <div className={` sticky top-0 left-0 w-[100%] bg-white flex flex-wrap justify-between p-4 `} >
                <h1 className=' w-[100%] text-2xl font-bold ' >Slides</h1>
                <Link to={"/"} className=" underline " >Home</Link>
                <div>buffer : {buffer.length}</div>
                <div>seed : {seed}</div>
            </div>
            {
                buffer.map(identity => <Canvas seed={identity[0]} width={width} height={height} className=" border-y-2 border-white bg-neutral-900 border-spacing-0" key={identity[1]} />)
            }
            <div className={` text-white text-center p-4 ${style.loading} ${loading ? "" : "hidden"}`}>Loading..</div>
        </section>
    )
}

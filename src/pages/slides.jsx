import React from 'react'
import { useState, useEffect, useContext } from 'react';
import Canvas from './canvas';
import style from './utilities.module.css'
import { Context } from './context';
import { Link } from 'react-router-dom';
import config from '../config'

export const PageContext = React.createContext();

export default function Slides(props) {
    const { count, setCount } = useContext(Context);

    const width = (window.innerWidth / window.innerHeight < 1 )? window.innerWidth: window.innerWidth*0.4;
    const height = window.innerHeight;
    const minimum = 1;
    const [seed, setSeed] = useState(0);
    const [buffer, setBuffer] = useState([[count,seed]]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [inView, setInView] = useState(1);

    const apiKey = config['api-key'];

    //setting count to zero on mount
    useEffect(() => {
        setCount(minimum);
        return () => {
            setInView(-1);
        }
    }, [])

    const scroll = evt => {
        const scrollIndex = evt.currentTarget.scrollTop - (count - minimum)* height;

        const slideNumber = Math.floor((evt.currentTarget.scrollTop + height / 2) / height);

        if(inView != slideNumber) {
            setInView(slideNumber);
            // console.log(slideNumber);
        }

        if (scrollIndex > 0) {
            setLoading(true);
            setCount(count => count + 1);
            addCanvas(count);
        }
    }

    function addCanvas(count) {
        setError(false);
        fetch("https://randommer.io/api/SocialNumber",
            {
                method: "GET",
                headers: {
                    "accept": "*/*",
                    "X-Api-Key": apiKey
                }
            }
        )
        .then(res => {
            if(Math.floor(res.status/100) == 2) return res.text();
            else throw new Error("Could not connect to server");
        })
        .then(txt => {
            const newSeed = txt.replaceAll("-", "").replaceAll("\"","");
            setSeed(parseInt(newSeed));
            setBuffer(buf => [...buf, [newSeed, count]]);
            setLoading(false);
        })
        .catch(e => {
            // console.log(e.message);
            setLoading(false);
            setError(e.message);
        });
    }

    return (
        <section
            className={` m-auto relative overflow-y-scroll border-x-2 border-white scroll-smooth `}
            onScroll={scroll}
            style = {{
                width : width,
                height : height
            }}
        >
            <div className={` sticky top-0 left-0 w-[100%] bg-white flex flex-wrap justify-between p-4 `} >
                <h1 className=' w-[100%] text-2xl font-bold ' >Slides</h1>
                <h4 className=' w-[100%] ' >Scroll to start animation</h4>
                <Link to={"/"} className=" underline " >Home</Link>
                <div>buffer : {buffer.length}</div>
                <div>seed : { buffer[inView] ? buffer[inView][0] : "xxxxxxxxx" }</div>
            </div>
            <PageContext.Provider value={{ inView }}>
                {
                    buffer.map(identity => <Canvas 
                        seed={identity[0]} 
                        width={width} 
                        height={height} 
                        className=" border-y-2 border-white bg-neutral-900 border-spacing-0" 
                        key={identity[1]} 
                        inView = {inView}
                        slide = {identity[1]}
                    />)
                }
            </PageContext.Provider>
            <div className={` text-white bg-sky-800 text-center p-4 ${style.loading} ${loading ? "" : "hidden"}`}>Loading..</div>
            <div className={` text-white bg-red-700 text-center p-4 ${error ? "" : "hidden"}`}>{error}</div>
        </section>
    )
}

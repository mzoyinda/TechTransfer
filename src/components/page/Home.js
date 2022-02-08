import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../Nav';
import Footer from '../Footer';
import { FaShareAlt } from 'react-icons/fa';
import { useRef } from "react";

const Home = () => {
    const loveRef = useRef(null);

    //geting all saved localstorage items
    const saved = localStorage.getItem("likes");

    //returning an empty string in place of null
    const initialValue = JSON.parse(saved) || "";

    let newLikes = [];

    //pushed the localstorage items into the newLikes array
    newLikes.push(...initialValue)

    // ALL STATES
    const [data, setData] = useState([]);
    const [loading, setloading] = useState(true);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {

                //fetching the api data using axios
                const result = await axios(
                    'https://api.nasa.gov/techtransfer/patent/?engine&api_key=nKrFP0XDzSRf9a6xPIPaGjr2Jxt4hFqiabyRrAoS',
                );

                //specifying the object to be displayed from the api's data
                const items = result.data.results;

                //pushing the api object into an already created state "data"
                setData(items);

                //make the spinner stop spinning
                setloading(false);
              
            } catch (error) {
                //cach the errors if any
                console.log(error)
            }
        }
        fetchData();     
    }, []);

    //toggle the like button
    const handleToggle = (e) => {
      
        const { id } = e.currentTarget;
        // const heart = document.getElementById(id);
        const animate = loveRef.current

        //set the toggle state to true/false
        setToggle(!toggle);

        //push a newly liked item into the newLikes array
       newLikes = [...initialValue, {
            key: id,
            liked: toggle
        }]
        
        if (toggle) {

            //if toggle is true, make the like button animated
            animate.classList.add("animated-heart"); 
        } else {

              //else, remove the animation class
              animate.classList.remove("animated-heart");
            
            //delete the unliked item from the local storage
            newLikes = [...newLikes.filter((like) => like.key !== id)];
        }
        
        // save the item liked in the localstorage
        localStorage.setItem("likes", JSON.stringify(newLikes))
    }


    // const copy = (e) => {
        
    //     //made the image url the target
    //     const { id } = e.currentTarget;
        
    //     //made the image url to be copied to the clipboard
    //     const cop = navigator.clipboard.writeText(id);
    //     console.log(cop)
    // }
    
    return (
        <>
                <Nav />
            <p className="intro">NASA's Technology Transfer Program ensures that innovations developed for exploration and discovery are broadly available to the public. The NASA patent portfolio is available to benefit US citizens. </p>
            <p className="intro">
            Through partnerships and licensing agreements with industry, these patents ensure that NASA’s investments in pioneering research find secondary uses that benefit the economy, create jobs, and improve quality of life. This endpoint provides structured, searchable developer access to NASA’s patents, software, and technology. spinoff descriptions that have been curated to support technology transfer
                </p>
                <p className="intro">
                More information can be found at 
                    <a href="https://technology.nasa.gov/"> technology.nasa.gov</a> and
                    <a href="https://software.nasa.gov/"> software.nasa.gov</a> and
                    <a href="https://spinoff.nasa.gov/"> spinoff.nasa.gov</a>.
                </p>
                
            <b className="intro">Some Examples are:</b>
            
            {/* while the data is fetching, returning a spinning gif */}

            {loading ? <div className="loading"><img src="/loading.gif" alt="loading gif" /></div> : ""}
            
            <div className="data-container">

                {/* when the data is successfully fetched, map the items to the frontend */}

                {data.map((dataItem, index) => {
                    const check = newLikes.some(e => e.key === dataItem[0])
                
                    return (
                            //the grid box
                            <div key={dataItem[0]} className="data-box" >
                                <div className="title">

                                    {/* display and html element embedded in the api */}
                                    <h1 dangerouslySetInnerHTML={{ __html: dataItem[2] }}></h1>
                                    <p> ({dataItem[5]})</p>
                                </div>
                                <div className="flex-box">
                                    <p>{dataItem[1]}</p>
                                    <p>{dataItem[12]}</p>
                                </div>
                                <img src={dataItem[10]} alt="nasa-images" id="nasaImg" className="nasa-images" />  
                               
                            {/* the icons */}
                                <div className='icons'>
                                <span
                                    ref={loveRef}
                                    key={dataItem[0]} id={dataItem[0]} className={check ? "animated-heart" : "Heart"} onClick= {handleToggle}  >
                                    ❤ 
                                    </span>
                                <a
                                    href={dataItem[10]} target="_blank" rel="noreferrer"><FaShareAlt className="share" /></a>
                                 
                                </div>
                            </div>
                        )
                    })}
                </div>
  
                <Footer />
            </>
        )
    
}

export default Home;

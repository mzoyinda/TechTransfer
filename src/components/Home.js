import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';
import Footer from './Footer';

const Home = () => {
    const saved = localStorage.getItem("likes");
    const initialValue = JSON.parse(saved) || "";
    let newLikes = [];
    newLikes.push(...initialValue)

    // ALL STATES
    const [data, setData] = useState([]);
    const [loading, setloading] = useState(true);
    const [toggle, setToggle] = useState(false);

  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios(
                    'https://api.nasa.gov/techtransfer/patent/?engine&api_key=nKrFP0XDzSRf9a6xPIPaGjr2Jxt4hFqiabyRrAoS',
                );
                const items = result.data.results;
                setData(items);
                setloading(false);
              
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();     
    }, []);

    const handleToggle = (e) => {
        const { id } = e.currentTarget;
        const heart = document.getElementById(id);

        setToggle(!toggle);

       newLikes = [...initialValue, {
            key: id,
            liked: toggle
        }]
        
        if (toggle) {
            heart.classList.add("animated-heart"); 
        } else {
            heart.classList.remove("animated-heart");
            
            newLikes = [...newLikes.filter((like) => like.key !== id)];
        }
        
        localStorage.setItem("likes", JSON.stringify(newLikes))
    }
    
    return (
        <>
                <Nav />
                <p className="intro">NASA's Technology Transfer Program ensures that innovations developed for exploration and discovery are broadly available to the public. The NASA patent portfolio is available to benefit US citizens. Through partnerships and licensing agreements with industry, these patents ensure that NASA’s investments in pioneering research find secondary uses that benefit the economy, create jobs, and improve quality of life. This endpoint provides structured, searchable developer access to NASA’s patents, software, and technology spinoff descriptions that have been curated to support technology transfer. More information can be found at <a href="https://technology.nasa.gov/">technology.nasa.gov</a> and <a href="https://software.nasa.gov/">software.nasa.gov</a> and <a href="https://spinoff.nasa.gov/">spinoff.nasa.gov</a>.</p>
      
                <p className="intro">Some Examples are:</p>
            {loading ? <div className="loading"><img src="/loading.gif" alt="loading gif" /></div> : ""}
            
                <div className="data-container">
                {data.map((dataItem, index) => {
                    const check = newLikes.some(e => e.key === dataItem[0])
                
                        return (
                            <div key={dataItem[0]} className="data-box" >
                                <div className="title">
                                    <h1 dangerouslySetInnerHTML={{ __html: dataItem[2] }}></h1>
                                    <p> ({dataItem[5]})</p>
                                </div>
                                <div className="flex-box">
                                    <p>{dataItem[1]}</p>
                                    <p>{dataItem[12]}</p>
                                </div>
                                <img src={dataItem[10]} alt="nasa-images" className="nasa-images" />  
                                
                                <span
                                    key={dataItem[0]} id={dataItem[0]} className={check ? "animated-heart" : "Heart"} onClick= {handleToggle}  >
                                    ❤ 
                                </span>
                            </div>
                        )
                    })}
                </div>
  
                <Footer />
            </>
        )
    
}

export default Home;

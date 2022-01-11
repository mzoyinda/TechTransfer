import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';
import Footer from './Footer';

const Home = () => {

  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [AllLikes, setAllLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [nasaKey, setNasaKey] = useState ([])

  const newInput = JSON.parse(JSON.stringify(AllLikes));

  
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
    const fetchLikes = async () => {
      const data = await localStorage.getItem("likes");
      if (data) {
        setAllLikes(JSON.parse(data));

        for (let i = 0; i < data.length; i++){
          nasaKey.push(data[i].id)
        }
        console.log(nasaKey); 
     //   and for each element set their isclick state to true
        console.log(AllLikes);
      }
     
    } 
   
    fetchData()
    fetchLikes()
    localStorage.setItem("likes", JSON.stringify(AllLikes));
   
  }, []);
    

  const handleToggle = (e) => {
    const { id } = e.currentTarget;
    const heart = document.getElementById(id);

    const check = AllLikes.find((element, index) => {
      return element.id === id
    })

    setNasaKey(prevState => {
      return {
        ...prevState,
        check
      }
    })

   
  }
  

  // const handleToggle = (e) => {
  //   const { id } = e.currentTarget;
  //   const heart = document.getElementById(id);
  //     // const sound = document.getElementById("audio");
  //     setClick(!isClick)
  //     if (isClick === true) {
  //       heart.classList.add("animated-heart");
  //       // sound.play();
  //       newInput.push({
  //         id: id,
  //         liked: isClick
  //       });
      
  //       setLikes(newInput)
  //     } else if (isClick === false) {
  //       heart.classList.remove("animated-heart");
  //       // sound.pause();
  //       // sound.currentTime = 0;
  //       setLikes((prevState) => {
  //         return [...prevState.filter((like) => like.id !== id)];
  //       });
  //   }
 
  // }


 
  // const style = () => {
  //   const stats = likes.map((item) => item.liked);
  //   console.log(stats);
  //   if (stats) {
  //        document.getElementById(id).classList.add("animated-heart");
  //   }
    
  //   // ids.forEach((i) => {
  //   //   document.getElementById(i).classList.add("animated-heart");
  //   // })
  //   // console.log(ids);
  // }


  return (
    <>
    <Nav/>
      <p className="intro">NASA's Technology Transfer Program ensures that innovations developed for exploration and discovery are broadly available to the public. The NASA patent portfolio is available to benefit US citizens. Through partnerships and licensing agreements with industry, these patents ensure that NASA’s investments in pioneering research find secondary uses that benefit the economy, create jobs, and improve quality of life. This endpoint provides structured, searchable developer access to NASA’s patents, software, and technology spinoff descriptions that have been curated to support technology transfer. More information can be found at <a href="https://technology.nasa.gov/">technology.nasa.gov</a> and <a href="https://software.nasa.gov/">software.nasa.gov</a> and <a href="https://spinoff.nasa.gov/">spinoff.nasa.gov</a>.</p>
      
      <p className="intro">Some Examples are:</p>
      {loading ? <div className="loading"><img src="/loading.gif" alt="loading gif" /></div> : ""}
        <div className="data-container">
          {data.map((dataItem, index) => {
          return (
            <div key={dataItem[0]}  className="data-box" >
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
                    key={dataItem[0]} id={dataItem[0]} className=" Heart" onClick={handleToggle}>
                    {nasaKey.includes(dataItem[0]) ? 'y' : 'n'}
                  </span>
                
          </div>
          )
            })}
      </div>
      <audio id="audio" src="/TEMISAN.mp3" autoplay="false" ></audio>
  
      <Footer/>
    </>
    )
}

export default Home;
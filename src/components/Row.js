import React ,{useState,useEffect} from 'react'
import axios from '../axios'
import requests from '../requests';
import './Row.css'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'
const base_url='https://image.tmdb.org/t/p/original/'

function Row({title,fetchUrl,isLargeRow}) {
    const [movies,setMovies]=useState([]);
    const [trailerUrl,setTrailerUrl]=useState("")
    //a snnipett of code which runs based on a specific condition/variable
    useEffect(function(){
           //if [] run once then don't run duh
       async function fetchData(){
           const request =await axios.get(fetchUrl)
            setMovies(request.data.results)
            return requests;
        }
        fetchData()
    },[fetchUrl]) 

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
   const handleClick=function(movie){
      if(trailerUrl){
          setTrailerUrl('');
      }
      else{
          movieTrailer(movie?.name || "")
          .then(function(url){
            const urlParams=new URLSearchParams(new URL(url).search)
          setTrailerUrl(urlParams.get('v'))
          }).catch(function(error){
              console.log(error);
          })
      }
   }
    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className="row_posters">
             {movies.map(function(movie){
               return (<img className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
               key={movie.id}
               onClick={function(){
                   handleClick(movie)
               }}
                src={`${base_url}${isLargeRow ?movie.poster_path:movie.backdrop_path}`} alt={movie.name} />)
             })}
            </div>
           {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}
export default Row;

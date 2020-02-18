import React from 'react';

import './css/main.css';
import './css/fonts.css';
import './css/header.css';

import SocketIOClient from 'socket.io-client';


//----

import "pure-react-carousel/dist/react-carousel.es.css";

let socket = SocketIOClient('http://167.114.26.108');

//Array temporário para testes

const movies = 
[
{"Title":"Guardians of the Galaxy Vol. 2","Year":"2017","Rated":"PG-13","Released":"05 May 2017","Runtime":"136 min","Genre":"Action, Adventure, Comedy, Sci-Fi","Director":"James Gunn","Writer":"James Gunn, Dan Abnett (based on the Marvel comics by), Andy Lanning (based on the Marvel comics by), Steve Englehart (Star-Lord created by), Steve Gan (Star-Lord created by), Jim Starlin (Gamora and Drax created by), Stan Lee (Groot created by), Larry Lieber (Groot created by), Jack Kirby (Groot created by), Bill Mantlo (Rocket Raccoon created by), Keith Giffen (Rocket Raccoon created by), Steve Gerber (Howard the Duck created by), Val Mayerik (Howard the Duck created by)","Actors":"Chris Pratt, Zoe Saldana, Dave Bautista, Vin Diesel","Plot":"The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father the ambitious celestial being Ego.","Language":"English","Country":"USA","Awards":"Nominated for 1 Oscar. Another 14 wins & 52 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.6/10"},{"Source":"Rotten Tomatoes","Value":"85%"},{"Source":"Metacritic","Value":"67/100"}],"Metascore":"67","imdbRating":"7.6","imdbVotes":"522,765","imdbID":"tt3896198","Type":"movie","DVD":"22 Aug 2017","BoxOffice":"$389,804,217","Production":"Walt Disney Pictures","Website":"N/A","Response":"True"},
{"Title":"Captain America: The First Avenger","Year":"2011","Rated":"PG-13","Released":"22 Jul 2011","Runtime":"124 min","Genre":"Action, Adventure, Sci-Fi","Director":"Joe Johnston","Writer":"Christopher Markus (screenplay), Stephen McFeely (screenplay), Joe Simon (comic books), Jack Kirby (comic books)","Actors":"Chris Evans, Hayley Atwell, Sebastian Stan, Tommy Lee Jones","Plot":"Steve Rogers, a rejected military soldier transforms into Captain America after taking a dose of a \"Super-Soldier serum\". But being Captain America comes at a price as he attempts to take down a war monger and a terrorist organization.","Language":"English, Norwegian, French","Country":"USA","Awards":"4 wins & 46 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BMTYzOTc2NzU3N15BMl5BanBnXkFtZTcwNjY3MDE3NQ@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"6.9/10"},{"Source":"Rotten Tomatoes","Value":"80%"},{"Source":"Metacritic","Value":"66/100"}],"Metascore":"66","imdbRating":"6.9","imdbVotes":"700,613","imdbID":"tt0458339","Type":"movie","DVD":"25 Oct 2011","BoxOffice":"$176,636,816","Production":"Paramount Pictures","Website":"N/A","Response":"True"},
{"Title":"The Avengers","Year":"2012","Rated":"PG-13","Released":"04 May 2012","Runtime":"143 min","Genre":"Action, Adventure, Sci-Fi","Director":"Joss Whedon","Writer":"Joss Whedon (screenplay), Zak Penn (story), Joss Whedon (story)","Actors":"Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth","Plot":"Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.","Language":"English, Russian, Hindi","Country":"USA","Awards":"Nominated for 1 Oscar. Another 38 wins & 79 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.0/10"},{"Source":"Rotten Tomatoes","Value":"91%"},{"Source":"Metacritic","Value":"69/100"}],"Metascore":"69","imdbRating":"8.0","imdbVotes":"1,216,895","imdbID":"tt0848228","Type":"movie","DVD":"25 Sep 2012","BoxOffice":"$623,279,547","Production":"Walt Disney Pictures","Website":"N/A","Response":"True"}
]


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            moviesArray:[]
        } 
    } 

    componentDidMount(){

        console.log('debug')

        socket.on('retrieveMovies', data => {
            console.warn(data)
            this.setState({moviesArray:data})
        })

        socket.emit('debug', 'aew')

        socket.emit('customSql', {sql:'SELECT * FROM movie_lib', event:'retrieveMovies'})
    }

    render() {
        const arr = movies
        return (
            <div>
                <div class="ui small image" style={{justifyContent:'center', alignItems:'center', width:'100%', display:'flex', backgroundColor:'#000'}}>
                    <img src={require('./img/logo.png')} style={{height:'50px', margin:10}}/>
                </div>               
                

                <div style={{padding:5, margin:0, backgroundColor:'#000'}} id="sticky">
                    <div class="ui inverted secondary menu">                

                        <a class="inverted item">
                            Home
                        </a>

                        <div class="right menu">
                            <div class="item">
                                <div class="ui inverted transparent left icon input">
                                    <input type="text" placeholder="Search..."/>
                                    <i class="search link icon"></i>
                                </div>
                            </div>
                            <a class="ui item">
                            Log In
                            </a>
                        </div>
                    </div>
                </div>            

                
                {/*PAGE CONTENT*/}
                <div id="content">                   
                
                    <div style={{padding:0, margin:10, backgroundColor:'#eee', borderRadius:'5px', maxWidth:'1000px'}}>

                        <div style={{padding:20}}>
                            <h2>New Releases</h2>
                        </div>

                        <div style={{display:'flex', overflowX:'scroll', padding:15, margin:10, height:'260px'}}>
                            {
                                arr.map((item, index) => {
                                    return(
                                        <div style={{height:'100%', minWidth:'150px', backgroundColor:'#fff', borderRadius:'5px', marginRight:10, backgroundImage:`url(${movies[index].Poster})`, backgroundSize:'cover'}}>
                                            
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div style={{padding:20}}>
                            <h2>Highlights</h2>
                        </div>

                        <div style={{display:'flex', width:'100%', padding:5}}>

                            <div style={{display:'flex', width:'50%', padding:15}}>
                                <div class="segment">
                                    <div style={{height:'230px', minWidth:'150px', backgroundColor:'#fff', borderRadius:'5px', marginRight:10, backgroundImage:`url(${movies[1].Poster})`, backgroundSize:'cover'}}/>
                                    <h3>{movies[1].Title}</h3>
                                    <h6>{movies[1].Genre}</h6>
                                    <p>{movies[1].Plot}</p>
                                </div>
                            </div>

                            <div style={{display:'flex', width:'50%', padding:15}}>
                                <div class="segment">
                                    <div style={{height:'230px', minWidth:'150px', backgroundColor:'#fff', borderRadius:'5px', marginRight:10, backgroundImage:`url(${movies[0].Poster})`, backgroundSize:'cover'}}/>
                                    <h3>{movies[0].Title}</h3>
                                    <h6>{movies[0].Genre}</h6>
                                    <p>{movies[0].Plot}</p>
                                </div>
                            </div>

                        </div>

                        <div style={{padding:20}}>
                            <h2>Recommended</h2>
                        </div>

                        <div style={{display:'flex', overflowX:'scroll', padding:15, margin:10, height:'260px'}}>
                            {
                                arr.map((item, index) => {
                                    return(
                                        <div style={{height:'100%', minWidth:'150px', backgroundColor:'#fff', borderRadius:'5px', marginRight:10, backgroundImage:`url(${movies[index].Poster})`, backgroundSize:'cover'}}>
                                            
                                        </div>
                                    )
                                })
                            }
                        </div>
                        
                    </div>

                </div>

            </div>
        )
    }
}

export default App;

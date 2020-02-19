import React from 'react'

import './css/main.css'
import './css/fonts.css'
import './css/header.css'

/**semantic.less permite moficar cores padrões do semantic ui - theme.config*/

import 'semantic-ui-less/semantic.less'
//----

import "pure-react-carousel/dist/react-carousel.es.css"

//Array temporário para testes

const movies = 
[
{"Title":"Guardians of the Galaxy Vol. 2","Year":"2017","Rated":"PG-13","Released":"05 May 2017","Runtime":"136 min","Genre":"Action, Adventure, Comedy, Sci-Fi","Director":"James Gunn","Writer":"James Gunn, Dan Abnett (based on the Marvel comics by), Andy Lanning (based on the Marvel comics by), Steve Englehart (Star-Lord created by), Steve Gan (Star-Lord created by), Jim Starlin (Gamora and Drax created by), Stan Lee (Groot created by), Larry Lieber (Groot created by), Jack Kirby (Groot created by), Bill Mantlo (Rocket Raccoon created by), Keith Giffen (Rocket Raccoon created by), Steve Gerber (Howard the Duck created by), Val Mayerik (Howard the Duck created by)","Actors":"Chris Pratt, Zoe Saldana, Dave Bautista, Vin Diesel","Plot":"The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father the ambitious celestial being Ego.","Language":"English","Country":"USA","Awards":"Nominated for 1 Oscar. Another 14 wins & 52 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.6/10"},{"Source":"Rotten Tomatoes","Value":"85%"},{"Source":"Metacritic","Value":"67/100"}],"Metascore":"67","imdbRating":"7.6","imdbVotes":"522,765","imdbID":"tt3896198","Type":"movie","DVD":"22 Aug 2017","BoxOffice":"$389,804,217","Production":"Walt Disney Pictures","Website":"N/A","Response":"True"},
{"Title":"Captain America: The First Avenger","Year":"2011","Rated":"PG-13","Released":"22 Jul 2011","Runtime":"124 min","Genre":"Action, Adventure, Sci-Fi","Director":"Joe Johnston","Writer":"Christopher Markus (screenplay), Stephen McFeely (screenplay), Joe Simon (comic books), Jack Kirby (comic books)","Actors":"Chris Evans, Hayley Atwell, Sebastian Stan, Tommy Lee Jones","Plot":"Steve Rogers, a rejected military soldier transforms into Captain America after taking a dose of a \"Super-Soldier serum\". But being Captain America comes at a price as he attempts to take down a war monger and a terrorist organization.","Language":"English, Norwegian, French","Country":"USA","Awards":"4 wins & 46 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BMTYzOTc2NzU3N15BMl5BanBnXkFtZTcwNjY3MDE3NQ@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"6.9/10"},{"Source":"Rotten Tomatoes","Value":"80%"},{"Source":"Metacritic","Value":"66/100"}],"Metascore":"66","imdbRating":"6.9","imdbVotes":"700,613","imdbID":"tt0458339","Type":"movie","DVD":"25 Oct 2011","BoxOffice":"$176,636,816","Production":"Paramount Pictures","Website":"N/A","Response":"True"},
{"Title":"The Avengers","Year":"2012","Rated":"PG-13","Released":"04 May 2012","Runtime":"143 min","Genre":"Action, Adventure, Sci-Fi","Director":"Joss Whedon","Writer":"Joss Whedon (screenplay), Zak Penn (story), Joss Whedon (story)","Actors":"Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth","Plot":"Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.","Language":"English, Russian, Hindi","Country":"USA","Awards":"Nominated for 1 Oscar. Another 38 wins & 79 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.0/10"},{"Source":"Rotten Tomatoes","Value":"91%"},{"Source":"Metacritic","Value":"69/100"}],"Metascore":"69","imdbRating":"8.0","imdbVotes":"1,216,895","imdbID":"tt0848228","Type":"movie","DVD":"25 Sep 2012","BoxOffice":"$623,279,547","Production":"Walt Disney Pictures","Website":"N/A","Response":"True"},
{"Title":"1917","Year":"2019","Rated":"R","Released":"10 Jan 2020","Runtime":"119 min","Genre":"Drama, War","Director":"Sam Mendes","Writer":"Sam Mendes, Krysty Wilson-Cairns","Actors":"Dean-Charles Chapman, George MacKay, Daniel Mays, Colin Firth","Plot":"April 6th, 1917. As a regiment assembles to wage war deep in enemy territory, two soldiers are assigned to race against time and deliver a message that will stop 1,600 men from walking straight into a deadly trap.","Language":"English, French, German","Country":"USA, UK, India, Spain, Canada","Awards":"Won 3 Oscars. Another 103 wins & 152 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BOTdmNTFjNDEtNzg0My00ZjkxLTg1ZDAtZTdkMDc2ZmFiNWQ1XkEyXkFqcGdeQXVyNTAzNzgwNTg@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.5/10"},{"Source":"Rotten Tomatoes","Value":"89%"},{"Source":"Metacritic","Value":"78/100"}],"Metascore":"78","imdbRating":"8.5","imdbVotes":"164,576","imdbID":"tt8579674","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"Universal Pictures","Website":"N/A","Response":"True"},
{"Title":"Joker","Year":"2019","Rated":"R","Released":"04 Oct 2019","Runtime":"122 min","Genre":"Crime, Drama, Thriller","Director":"Todd Phillips","Writer":"Todd Phillips, Scott Silver, Bob Kane (based on characters created by), Bill Finger (based on characters created by), Jerry Robinson (based on characters created by)","Actors":"Joaquin Phoenix, Robert De Niro, Zazie Beetz, Frances Conroy","Plot":"In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.","Language":"English","Country":"USA, Canada","Awards":"Won 2 Oscars. Another 57 wins & 163 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.6/10"},{"Source":"Rotten Tomatoes","Value":"69%"},{"Source":"Metacritic","Value":"59/100"}],"Metascore":"59","imdbRating":"8.6","imdbVotes":"665,555","imdbID":"tt7286456","Type":"movie","DVD":"17 Dec 2019","BoxOffice":"N/A","Production":"Warner Bros. Pictures","Website":"N/A","Response":"True"}
]


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            moviesArray:[],
            moviesSearchArray:[{Response:'False'}],

            addBtnColor:'#44444420',
            blur:0,

            activeLoginPanel:false,
            activeSearchPanel:false,

            searchText:'none',
        } 
    } 

    componentDidMount(){
        
    }

    //Função para ativar overlay panels

    _handleLogin_Panel(activate){
        this.setState({activeLoginPanel: activate, blur: activate ? 5 : 0})
    }

    _handleAdd_Panel(activate){        
        this.setState({activeSearchPanel: activate, blur: activate ? 5 : 0})
    }

    //Button handles

    _handleAddButton(pressed){
        this.setState({addBtnColor: pressed ? '#44444450' : '#44444420'})
    }

    _handleSearchText(event){
        this.setState({typed: event.target.value});
    }

    //Overlay panels

    _loginPanel(){
        /** Painel sobreposto para login e registro */

        if(this.state.activeLoginPanel){
            return (
                <div id="dialogBackground">
                    <div id="loginPanel">

                        <h1 id="title">LOGIN</h1>
                                                            
                        <div className="ui inverted transparent left icon  input" id="loginInput">
                            <input type="username" placeholder="Login"/>
                            <i style={{marginLeft:'10px'}} className="user link icon"></i>
                        </div>
                        
                        <div className="ui inverted transparent left icon  input" id="loginInput">
                            <input type="password" placeholder="Password"/>
                            <i style={{marginLeft:'10px'}} className="lock link icon"></i>
                        </div>

                        <div>
                            <button id="orangeButton" className="ui inverted yellow button">Login</button>
                        </div>

                        <h1 id="title">REGISTER</h1>
                                                            
                        <div className="ui inverted transparent left icon  input" id="loginInput">
                            <input type="username" placeholder="Login"/>
                            <i style={{marginLeft:'10px'}} className="user link icon"></i>
                        </div>
                        
                        <div className="ui inverted transparent left icon  input" id="loginInput">
                            <input type="password" placeholder="Password"/>
                            <i style={{marginLeft:'10px'}} className="lock link icon"></i>
                        </div>

                        <div className="ui inverted transparent left icon  input" id="loginInput">
                            <input type="password" placeholder="Confirm Password"/>
                            <i style={{marginLeft:'10px'}} className="lock link icon"></i>
                        </div>

                        <div>
                            <button className="ui inverted yellow button">Register!</button>
                            <button className="ui inverted button" onClick={() => this._handleLogin_Panel(false)}>Maybe Later</button>
                        </div>

                    </div>
                </div>
            )
        }
    }

    _movieSearchPanel(){
        /** Painel sobreposto para busca e adição de filmes */
        if(this.state.activeSearchPanel){
            return (
                <div id="dialogBackground">
                    <div id="loginPanel">

                        <h1 id="title">ADD MOVIE</h1>
                        <h6 id="title">Here you can add movies to your list! Try to search by its title.</h6>
                                                            
                        <div className="ui inverted transparent left icon  input" id="loginInput">
                            <input type="text" placeholder="Movie..." onChange={txt => this.setState({searchText:txt.target.value})}/>
                            <i style={{marginLeft:'10px'}} className="search link icon"></i>
                        </div>      

                         <div>
                            <button className="ui inverted yellow button" onClick={() => this._searchTool()}>Search</button>
                            <button className="ui inverted button" onClick={() => this._addResultToArray()}>Add</button>
                        </div>

                        
                       
                            {
                            this.state.moviesSearchArray.map((item, index) => {
                                if(this.state.moviesSearchArray[0].Response === 'True'){
                                    return(
                                        <div style={{width:'100%', height:'100%', backgroundColor:'#222', margin:"20px", borderRadius:'5px', padding:'15px'}}>
                                            <div style={{display:'flex', flexDirection:'row'}}>
                                                <div>
                                                    <div style={{height:'100px', width:'70px', backgroundColor:'#fff', borderRadius:'5px', marginRight:10, backgroundImage:`url(${item.Poster})`, backgroundSize:'cover'}}/>
                                                </div>

                                                <div>
                                                    <p style={{fontSize:15, margin:0, color:'#fff'}}>{item.Title}</p>
                                                    <p style={{fontSize:12, margin:0, color:'#fff'}}>{item.imdbRating}</p>
                                                    <p style={{fontSize:12, margin:0, color:'#fff'}}>{item.Actors}</p>
                                                </div> 
                                            </div>
                                        </div>
                                        
                                    )
                                }else{
                                    return(
                                        <div style={{width:'100%', height:'100%', margin:"20px", padding:'15px'}}>
                                            <div style={{display:'flex', flexDirection:'row'}}>
                                                    <p style={{fontSize:12, margin:0, color:'#fff'}}>No results found</p>
                                            </div>
                                        </div>
                                        
                                    )
                                }
                            })
                            }

                             

                        <button className="ui inverted button" onClick={() => this._handleAdd_Panel(false)}>Voltar</button>         

                    </div>
                </div>
            )
        }
    }

    //Overlay panels - Funcoes

    _searchTool(){
        const getMovies = async () => {
            const result = await fetch(`http://www.omdbapi.com/?apikey=c7002bae&t=${this.state.searchText}&plot=short`)
            const jsonArray = [];

            jsonArray.push(await result.json())

            console.log(this.state.moviesSearchArray.Response)
           
            this.setState({moviesSearchArray:jsonArray})
        }

        getMovies();
    }

    _addResultToArray(){        
        const newJson = this.state.moviesArray;

        newJson.push(this.state.moviesSearchArray[0]);

        this.setState({moviesArray:newJson, moviesSearchArray:[{Response:'False'}]})
    }

    render() {
        const arr = movies
        return (
            <div id="page">
                <div className="ui small image" style={{justifyContent:'center', alignItems:'center', width:'100%', display:'flex', backgroundColor:'#000'}}>
                    <img src={require('./img/logo.png')} style={{height:'50px', margin:10}}/>
                </div>               
                

                <div style={{padding:5, margin:0, backgroundColor:'#000', zIndex:1}} id="sticky">
                    <div className="ui inverted secondary menu">                

                        <a className="inverted item">
                            Home
                        </a>

                        <div className="right menu">
                            <div className="item">
                                <div className="ui inverted transparent left icon input">
                                    <input type="text" placeholder="Search..."/>
                                    <i className="search link icon"></i>
                                </div>
                            </div>
                            <a className="ui item" onClick={() => this._handleLogin_Panel(true)}>
                            Log In
                            </a>
                        </div>
                    </div>
                </div>  

                {/** PAGE CONTENT - SEMANTIC UI */}
                <div style={{padding:'10px'}}>

                    <div id="mainPage" style={{filter:`blur(${this.state.blur}px)`}}>

                        <div style={{padding:20}}>
                            <h2>New Releases</h2>
                        </div>

                        <div className="features ui grid noMargin" id="horizontalContent">
                            <div className="sixteen wide column">
                                <div style={{display:'flex', overflowX:'scroll', padding:15, margin:10, height:'260px'}}>
                                {
                                    arr.map((item, index) => {
                                        return(
                                            <div style={{height:'100%', minWidth:'150px', backgroundColor:'#fff', borderRadius:'5px', marginRight:10, backgroundImage:`url(${movies[index].Poster})`, backgroundSize:'cover'}}/>
                                        )
                                    })
                                }
                                </div>
                            </div>
                        </div>                        

                        <div style={{padding:20}}>
                            <h2>Highlights</h2>
                        </div>

                        <div className="ui stackable grid" style={{padding:'10px'}}>

                            <div className="row">
                                <div className="three wide column">
                                    <div>
                                        <div style={{height:'230px', width:'150px', backgroundColor:'#fff', borderRadius:'5px', marginRight:10, backgroundImage:`url(${movies[3].Poster})`, backgroundSize:'cover'}}/> 
                                    </div>
                                </div>
                                <div className="five wide column">
                                    <div>
                                        <h3>{movies[3].Title.toUpperCase()}</h3>
                                        <h5>{movies[3].Genre}</h5>
                                        <h4>{movies[3].Plot}</h4> 
                                    </div>
                                </div>

                                <div className="three wide column">
                                    <div>
                                        <div style={{height:'230px', width:'150px', backgroundColor:'#fff', borderRadius:'5px', marginRight:10, backgroundImage:`url(${movies[4].Poster})`, backgroundSize:'cover'}}/> 
                                    </div>
                                </div>
                                <div className="five wide column">
                                    <div>
                                        <h3>{movies[4].Title.toUpperCase()}</h3>
                                        <h5>{movies[4].Genre}</h5>
                                        <h4>{movies[4].Plot}</h4> 
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        
                        <div style={{padding:20}}>
                            <h2>Your List</h2>
                        </div>

                        <div className="features ui grid noMargin" id="horizontalContent">
                            <div className="sixteen wide column">

                                <div style={{display:'flex', overflowX:'scroll', padding:15, margin:10, height:'260px'}}>

                                    <div style={{height:'100%', minWidth:'150px', backgroundColor:this.state.addBtnColor, borderRadius:'5px', marginRight:10}} onPointerDown={() => {this._handleAddButton(true); this._handleAdd_Panel(true)}} onPointerUp={e => this._handleAddButton(false)}>
                                        <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%', flexDirection:'column'}}>
                                            <img style={{height:'80px'}} src={require('./img/add_icon.png')}></img>
                                            <h4>Add</h4>
                                        </div>
                                    </div>

                                    {
                                    this.state.moviesArray.map((item, index) => {
                                        return(
                                            <div style={{height:'100%', minWidth:'150px', backgroundColor:'#fff', borderRadius:'5px', marginRight:10, backgroundImage:`url(${this.state.moviesArray[index].Poster})`, backgroundSize:'cover'}}/>
                                        )
                                    })
                                    }

                                    
                                </div>
                            </div>
                        </div>

                    </div>
                
                </div>


                {this._loginPanel()}               
                {this._movieSearchPanel()}               

                
            </div>
                
        )
    }
}

export default App;

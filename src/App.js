import React from 'react'

import './css/main.css'
import './css/fonts.css'
import './css/header.css'
import './css/details.css'

import Highlight from './components/highlight'
import AuthPanel from './components/authPanel'
import EditPanel from './components/editPanel'
import MovieDetails from './components/movieDetails'

import api from './services/api'

//#region DB

////#endregion

//classe que armazena dados de demonstracao
const movies = require('./data/showroom.json')

const imgAlt = 'https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png'

class App extends React.Component {    

    constructor() {
        super();  
        this.state = {
            //Utils - auxiliares para o comportamento
            moviesArray:[],
            moviesSearch:undefined,
            selectedMovie:undefined,
            
            //Utils - auxiliares de efeitos
            addBtnColor:'#44444420',
            blur:0,
            
            //Booleans para paineis overlay
            overlayIndex:0,

            activeLoginPanel:false,
            activeSearchPanel:false,
            showDetails:false,
            showUpdate:false,

            //textos de inputs
            searchText:'none',
            addMovieTrailer:undefined,

            //API info
            loginInfo:'',
            registerInfo:'',

            //informacao de usuario - apos login
            user:undefined
        }       
    }

    componentDidMount(){
         
    }

    //Metodos de conexao com back end (axios)

    async apiRetrieveUserMovies(){
        try{             
            const response = await api.get('/movie/' + this.state.user._id)
            this.setState({moviesArray:response.data.movie, selectedMovie:undefined})
        }catch (e){
            console.log(e.response)
        }
    }

    async apiSaveUserMovie(movie){
        try{ 
            await api.post('/movie/', movie)
            this.apiRetrieveUserMovies()
        }catch (e){
            console.log(e.response)
        }
    }

    _details(show, index){
        this.setState({showDetails:show, selectedMovie:show ? this.state.moviesArray[index] : undefined, blur:show ? 5 : 0})
    }

    _update(show){        
        this.setState({showDetails:false, showUpdate:show, blur:show ? 5 : 0})

        if (!show){
            this.apiRetrieveUserMovies()
        }
    }

    _loginAction(user){
        this.setState({user:user, activeLoginPanel:false, blur:0})
        this.apiRetrieveUserMovies()
    }

    //Função para ativar overlay panel

    _handleLogin_Panel(activate){
        if(this.state.user === undefined){
            this.setState({activeLoginPanel: activate, blur: activate ? 5 : 0})
        }else{
            this.setState({user: undefined, moviesArray: []})
        }
    }

    _handleAdd_Panel(activate){
        if(this.state.user !== undefined){
            this.setState({activeSearchPanel: activate, blur: activate ? 5 : 0})
        }else{
            this._handleLogin_Panel(true)
        }
        
    }

    //Button handles

    _handleAddButton(pressed){
        this.setState({addBtnColor: pressed ? '#44444450' : '#44444420'})
    }

    _exitDetails(){
        this.setState({selectedMovie:undefined, showDetails:false})
    } 

    //Overlay panels - Funcoes

    _searchTool(){
        const getMovies = async () => {
            const result = await fetch(`http://www.omdbapi.com/?apikey=c7002bae&t=${this.state.searchText}&plot=short`)
            const resultMovie = await result.json();
           
            this.setState({moviesSearch:resultMovie})
        }

        getMovies();
    }

    _addResultToArray(){  
        if (this.state.moviesSearch === undefined)
            return

        console.log("trailer :" + this.state.addMovieTrailer)

        const movieObject = {
            Title:this.state.moviesSearch.Title,
            Genre: this.state.moviesSearch.Genre,
            Year: this.state.moviesSearch.Year,
            Actors: this.state.moviesSearch.Actors,
            Plot: this.state.moviesSearch.Plot,
            Poster: this.state.moviesSearch.Poster,
            Trailer: this.state.addMovieTrailer, //adicionando trailer manualmente, ja que o OMDB nao fornece
            user: this.state.user._id
        }

        console.log("trailer :" + movieObject.trailer)

        const newJson = this.state.moviesArray;

        this.apiSaveUserMovie(movieObject)

        newJson.push(movieObject);

        this.setState({moviesSearch:undefined, addMovieTrailer:undefined})
    }

    //Overlay panels

    _loginPanel(){
        /** Painel sobreposto para login e registro */

        if(this.state.activeLoginPanel){
            return (
                <AuthPanel hidePanel={this._handleLogin_Panel.bind(this)} loginAction={this._loginAction.bind(this)}/>
            )
        }
    }

    _movieSearchPanel(){
        /** Painel sobreposto para busca e adição de filmes */
        if(this.state.activeSearchPanel){
            return (
                <div id="dialogBackground">
                    <div id="panel">

                        <h1 id="title">ADD MOVIE</h1>
                        <h6 id="title">Here you can add movies to your list! Try to search by its title.</h6>
                                                            
                              

                        <div id="add_extra">
                            <div className="ui inverted transparent left icon  input" id="mainInput">
                                <input type="text" placeholder="Blue lagoon..." onChange={txt => this.setState({searchText:txt.target.value})}/>
                                <i style={{marginLeft:'10px'}} className="search link icon"></i>
                            </div>

                            <div class="ui vertical animated yellow button" tabindex="0" onClick={() => this._searchTool()}>
                                <div class="hidden content">Search</div>
                                <div class="visible content">
                                    <i class="search icon"></i>
                                </div>
                            </div>                        
                        </div>

                        
                       
                        {this._movieSearchResult()}

                             
                        <div class="ui vertical animated button" style={{width:"120px"}} tabindex="0" onClick={() => this._handleAdd_Panel(false)}>
                            <div class="hidden content">Back</div>
                            <div class="visible content">
                                <i class="left arrow icon"></i>
                            </div>
                        </div>        

                    </div>
                </div>
            )
        }
    }

    _movieSearchResult(){

        if(this.state.moviesSearch !== undefined && this.state.moviesSearch.Response !== "False"){
            return(
                <>
                    <div style={{width:'100%', height:'100%', backgroundColor:'#222', margin:"20px", borderRadius:'5px', padding:'15px'}}>
                        <div style={{display:'flex', flexDirection:'row'}}>
                            <div>
                                <div style={{height:'100px', width:'70px', backgroundColor:'#fff', borderRadius:'5px', marginRight:10, backgroundImage:`url(${this.state.moviesSearch.Poster})`, backgroundSize:'cover'}}/>
                            </div>

                            <div>
                                <p style={{fontSize:15, margin:0, color:'#fff'}}>{this.state.moviesSearch.Title}</p>
                                <p style={{fontSize:12, margin:0, color:'#fff'}}>{this.state.moviesSearch.imdbRating}</p>
                                <p style={{fontSize:12, margin:0, color:'#fff'}}>{this.state.moviesSearch.Actors}</p>
                            </div> 
                        </div>
                    </div>

                    <div id="add_extra">
                        <div className="ui inverted transparent left icon  input" id="mainInput">
                            <input type="text" placeholder="YouTube trailer..." onChange={txt => this.setState({addMovieTrailer:txt.target.value})}/>
                            <i style={{marginLeft:'10px'}} className="film link icon"></i>
                        </div>

                        <div class="ui vertical animated green button" style={{width:"120px"}} tabindex="0" onClick={() => this._addResultToArray()}>
                            <div class="hidden content">Add movie</div>
                            <div class="visible content">
                                <i class="plus icon"></i>
                            </div>
                        </div>                        
                    </div>

                    
                </>
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
    }

    _movieDetails(){
        if(this.state.selectedMovie !== undefined && this.state.showDetails){
            return(
                <MovieDetails movie={this.state.selectedMovie} returnMain={this._details.bind(this)} reloadMovies={this.apiRetrieveUserMovies.bind(this)} editMovie={this._update.bind(this)}/>
            )
        }
    }   

    _movieUpdate(){
        if(this.state.showUpdate){
            return(
                <EditPanel movie={this.state.selectedMovie} returnDetails={this._update.bind(this)}/>
            )
        }
    } 

    render() {
        return (
            <div id="page">
                <div className="ui small image" style={{justifyContent:'center', alignItems:'center', width:'100%', display:'flex', backgroundColor:'#000'}}>
                    <img src={require('./img/logo.png')} style={{height:'50px', margin:10}} alt={imgAlt}/>
                </div>               
                

                <div style={{padding:5, margin:0, backgroundColor:'#000', zIndex:1}} id="sticky">
                    <div className="ui inverted secondary menu">                

                        <a className="inverted item" href="/#userlist">
                            {this.state.user === undefined ? 'Home' : 'Welcome, ' + this.state.user.name}
                        </a>

                        <div className="right menu">

                            <div className="item">
                                <div className="ui inverted transparent left icon input">
                                    <input type="text" placeholder="Search..."/>
                                    <i className="search link icon"></i>
                                </div>
                            </div>

                            <a className="ui item" onClick={() => this._handleLogin_Panel(true)}>
                            {this.state.user === undefined ? 'Log In' : 'Log Out'}

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
                                    movies.list.map((item, index) => {
                                        return(
                                            <div key={index} style={{height:'100%', minWidth:'150px', backgroundColor:'#fff', borderRadius:'5px', marginRight:10, backgroundImage:`url(${item.Poster})`, backgroundSize:'cover'}}/>
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
                                
                                {movies.highlights.map((item, index) => {
                                    return(
                                        <Highlight key={index} movie={item}/>   
                                    )
                                     
                                })}
                                
                            </div>
                            
                        </div>
                        
                        <div style={{padding:20}} id="userlist">
                            <h2>Your List</h2>
                        </div>

                        <div className="features ui grid noMargin" id="horizontalContent">
                            <div className="sixteen wide column">

                                <div style={{display:'flex', overflowX:'scroll', padding:15, margin:10, height:'260px'}}>

                                    <div style={{height:'100%', minWidth:'150px', backgroundColor:this.state.addBtnColor, borderRadius:'5px', marginRight:10}} onPointerDown={() => {this._handleAddButton(true); this._handleAdd_Panel(true)}} onPointerUp={e => this._handleAddButton(false)}>
                                        <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%', flexDirection:'column'}}>
                                            <img style={{height:'80px'}} src={require('./img/add_icon.png')} alt={imgAlt}></img>
                                            <h4>Add</h4>
                                        </div>
                                    </div>

                                    {
                                    this.state.moviesArray.map((item, index) => {
                                        return(
                                            <div onClick={() => this._details(true, index)} style={{height:'100%', minWidth:'150px', backgroundColor:'#fff', borderRadius:'5px', marginRight:10, backgroundImage:`url(${item.Poster})`, backgroundSize:'cover'}}/>
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

                {this._movieDetails()}

                {this._movieUpdate()}
                
            </div>
                
        )
    }
}

export default App;

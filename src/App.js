import React from 'react'

import './css/main.css'
import './css/fonts.css'
import './css/header.css'
import './css/details.css'

import Highlight from './components/highlight'
import MovieDetails from './components/movieDetails'

import api from './services/api'

//#region DB

////#endregion

//classe que armazena dados de demonstracao
const movies = require('./data/showroom.json')



class App extends React.Component {    

    constructor() {
        super();  
        this.state = {
            moviesArray:[],
            moviesSearchArray:[{Response:'False'}],
            selectedMovie:undefined,
            showDetails:false,
    
            addBtnColor:'#44444420',
            blur:0,
    
            activeLoginPanel:false,
            activeSearchPanel:false,
            
            //textos de inputs
            searchText:'none',
            loginText:'',
            passwordText:'',
    
            loginInfo:'',

            user:undefined
        }       
    }

    componentDidMount(){
         
    }

    async apiLogin(){
        try{ 
            const response = await api.post('/auth/login', { 
            email:this.state.loginText, password:this.state.passwordText }) 
            console.log(response.data)            

            this.setState({user:response.data.user, activeLoginPanel:false, blur:0})

            this.apiRetrieveUserMovies()

            console.log(response.data)
            
        }catch (e){
            console.log(e)
            this.setState({loginInfo:e.response.data.error})
        }
    }

    async apiRegister(){
        try{ 
            const response = await api.post('/auth/register', { 
            email:this.state.loginText, password:this.state.passwordText }) 
            console.log(response.data) 

            this.setState({loginInfo:''})

            this.setState({user:response.data.user, activeLoginPanel:false, blur:0})

        }catch (e){
            console.log(e)
            this.setState({loginInfo:e.response.data.error})
        }
    }

    async apiRetrieveUserMovies(){
        try{             
            const response = await api.get('/movie/' + this.state.user._id)
            this.setState({moviesArray:response.data.movie})
            console.log('TRYING TO RETRIEVE MOVIES LIST ' + this.state.user._id)
        }catch (e){
            console.log(e)
        }
    }

    async apiSaveUserMovie(movie){
        try{ 
            const response = await api.post('/movie/', movie)
            this.apiRetrieveUserMovies()
        }catch (e){
            console.log(e.response)
        }
    }

    _details(show, index){
        this.setState({showDetails:show, selectedMovie:show ? this.state.moviesArray[index] : undefined, blur:show ? 5 : 0})
    }

    //Função para ativar overlay panel

    _handleLogin_Panel(activate){
        if(this.state.user == undefined){
            this.setState({activeLoginPanel: activate, blur: activate ? 5 : 0})
        }else{
            this.setState({user: undefined, moviesArray: []})
        }
    }

    _handleAdd_Panel(activate){
        if(this.state.user != undefined){
            this.setState({activeSearchPanel: activate, blur: activate ? 5 : 0})
        }else{
            this._handleLogin_Panel(true)
        }
        
    }

    //Button handles

    _handleAddButton(pressed){
        this.setState({addBtnColor: pressed ? '#44444450' : '#44444420'})
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
        

        const movieObject = {
            Title:this.state.moviesSearch.Title,
            Genre: this.state.moviesSearch.Genre,
            Year: this.state.moviesSearch.Year,
            Actors: this.state.moviesSearch.Actors,
            Plot: this.state.moviesSearch.Plot,
            Poster: this.state.moviesSearch.Poster,
            trailer: '',
            user: this.state.user._id
        }

        const newJson = this.state.moviesArray;

        this.apiSaveUserMovie(movieObject)

        newJson.push(movieObject);

        this.setState({moviesSearch:undefined})
    }

    //Overlay panels

    _loginPanel(){
        /** Painel sobreposto para login e registro */

        if(this.state.activeLoginPanel){
            return (
                <div id="dialogBackground">
                    <div id="panel">

                        <h1 id="title">LOGIN</h1>

                                       
                            <div className="ui inverted transparent left icon  input" id="loginInput">
                                <input type="username" placeholder="Login" onChange={txt => this.setState({loginText:txt.target.value})}/>
                                <i style={{marginLeft:'10px'}} className="user link icon"></i>
                            </div>
                            
                            <div className="ui inverted transparent left icon  input" id="loginInput">
                                <input type="password" placeholder="Password" onChange={txt => this.setState({passwordText:txt.target.value})}/>
                                <i style={{marginLeft:'10px'}} className="lock link icon"></i>
                            </div>

                            <a id="error">{this.state.loginInfo}</a>

                            <div onClick={this.apiLogin.bind(this)}>
                                <button className="ui inverted yellow button">Login</button>
                            </div>
                        

                        <h1 id="title">REGISTER</h1>

                        
                            <div className="ui inverted transparent left icon  input" id="loginInput">
                                <input type="username" placeholder="Name"/>
                                <i style={{marginLeft:'10px'}} className="user link icon"></i>
                            </div>
                            
                            <div className="ui inverted transparent left icon  input" id="loginInput">
                                <input type="new-email" placeholder="Email"/>
                                <i style={{marginLeft:'10px'}} className="mail link icon"></i>
                            </div>

                            <div className="ui inverted transparent left icon  input" id="loginInput">
                                <input type="new-password" placeholder="Password"/>
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
                    <div id="panel">

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

                        
                       
                            {this._movieSearchResult()}

                             

                        <button className="ui inverted button" onClick={() => this._handleAdd_Panel(false)}>Voltar</button>         

                    </div>
                </div>
            )
        }
    }

    _movieSearchResult(){
        if(this.state.moviesSearch !== undefined){
            return(
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

    _exitDetails(){
        this.setState({selectedMovie:undefined, showDetails:false})
    } 

    _movieDetails(){
        if(this.state.selectedMovie !== undefined){
            return(
                <MovieDetails movie={this.state.selectedMovie} returnMain={this._details.bind(this)} reloadMovies={this.apiRetrieveUserMovies.bind(this)}/>

            )
        }
    }

    render() {
        return (
            <div id="page">
                <div className="ui small image" style={{justifyContent:'center', alignItems:'center', width:'100%', display:'flex', backgroundColor:'#000'}}>
                    <img src={require('./img/logo.png')} style={{height:'50px', margin:10}}/>
                </div>               
                

                <div style={{padding:5, margin:0, backgroundColor:'#000', zIndex:1}} id="sticky">
                    <div className="ui inverted secondary menu">                

                        <a className="inverted item">
                            {this.state.user == undefined ? 'Home' : 'Welcome, ' + this.state.user.name}
                        </a>

                        <div className="right menu">

                            <div className="item">
                                <div className="ui inverted transparent left icon input">
                                    <input type="text" placeholder="Search..."/>
                                    <i className="search link icon"></i>
                                </div>
                            </div>

                            <a className="ui item" onClick={() => this._handleLogin_Panel(true)}>
                            {this.state.user == undefined ? 'Log In' : 'Log Out'}

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
                                            <div style={{height:'100%', minWidth:'150px', backgroundColor:'#fff', borderRadius:'5px', marginRight:10, backgroundImage:`url(${item.Poster})`, backgroundSize:'cover'}}/>
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
                                        <Highlight movie={item}/>   
                                    )
                                    
                                })}
                                
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
                
            </div>
                
        )
    }
}

export default App;

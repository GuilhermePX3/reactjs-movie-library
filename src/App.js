import React from 'react'

import './css/main.css'
import './css/fonts.css'
import './css/header.css'
import Highlight from './components/highlight'

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

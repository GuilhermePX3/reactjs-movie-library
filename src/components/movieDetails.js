import React, { Component } from 'react';

import api from '../services/api'

export default class MovieDetails extends Component {


    componentDidMount(){

    }

    _youtubePlayer(){
        if(this.props.movie === undefined || this.props.movie.Trailer === undefined || this.props.movie.Trailer === "none" || this.props.movie.Trailer === null)
            return(
                <h1>Invalid youtube trailer!</h1>
            )

        console.log(this.props.movie.Trailer )

        if(this.props.movie.Trailer !== undefined || this.props.movie.Trailer === "none"){
            const link = "https://www.youtube.com/embed/" + this.props.movie.Trailer.split("?v=")[1]
            console.log(link)

            return (
                <div
                    className="video"
                    style={{
                        position: "relative",
                        paddingBottom: "56.25%" /* 16:9 */,
                        paddingTop: 25,
                        height: 0
                    }}
                    >
                    <iframe
                    title='Youtube Trailer'
                    style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                    }}
                    src={link}
                    frameBorder="0"
                    />
                </div>
            )
        }else{
            return(
                <h4>Invalid youtube trailer!</h4>
            )
        }
    }

    async apiDelete(){
        try{ 
            console.log(this.props.movie)

            await api.delete('/movie/' + this.props.movie._id)           
            
            setTimeout(() => {
                this.props.reloadMovies()
                this.props.returnMain(false, 0)
            }, 500);
            
        }catch (e){
            
        }
    }
    
    render() {

        if(this.props.movie !== undefined){
            return (
                <div id="dialogBackground">
                        <div id="panelDetails">
                            <div id="detailsScrollable">
                                <div className="ui stackable grid" style={{maxWidth:'600px'}}> 
                                    <div className="five wide column" style={{marginBottom:20}}>
                                        <div>
                                            <div style={{height:'230px', width:'150px', backgroundColor:'#fff', borderRadius:'5px', marginRight:10, backgroundImage:`url(${this.props.movie.Poster})`, backgroundSize:'cover'}}/> 
                                        </div>
                                    </div>
                                    <div className="eleven wide column">
                                        <div>
                                            <h5 id="det-title">{this.props.movie.Title.toUpperCase()}, {this.props.movie.Year}</h5>
                                            <h5 id="det-genre">{this.props.movie.Genre}</h5>
                                            <h5 id="det-actors">Main Actors: {this.props.movie.Actors}</h5>
                                            <h5 id="det-plot">{this.props.movie.Plot}</h5> 
                                        </div>
                                    </div>
                                </div>

                                <div style={{width:'100%', maxWidth:'600px', marginTop:"20px", padding:15}}>

                                    {this._youtubePlayer(this.props.movie.Trailer)}

                                </div>
                            </div>

                            <div style={{display:'flex', justifyContent:'space-between', marginTop:"20px"}}>
                                <div>
                                    <div class="ui vertical inverted animated yellow button" onPointerDown={() => this.props.returnMain(false, 0)} tabindex="0">
                                        <div class="hidden content">Back</div>
                                        <div class="visible content">
                                            <i class="arrow left icon"></i>
                                        </div>
                                    </div>
                                    <div class="ui vertical inverted animated button" tabindex="0" onPointerDown={() => this.props.editMovie(true)}>
                                        <div class="hidden content">Edit</div>
                                        <div class="visible content">
                                            <i class="pencil alternate icon"></i>
                                        </div>
                                    </div>
                                </div>
                                    
                                <div class="ui vertical animated red button" tabindex="0" onPointerDown={() => {this.apiDelete()}}>
                                    <div class="hidden content">Remove</div>
                                    <div class="visible content">
                                        <i class="trash icon"></i>
                                    </div>
                                </div>
                            </div>                          
                        </div>
                    </div>

            ); 
        }else{
            return(
                <h4>Movie data could not be read!</h4>
            )
        }
    
    }
}
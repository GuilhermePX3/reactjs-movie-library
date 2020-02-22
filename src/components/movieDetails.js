import React, { Component } from 'react';

import api from '../services/api'

export default class MovieDetails extends Component {


    componentDidMount(){
        //setTimeout(() => {this.props.returnMain(false, 0)}, 1500)
    }

    async apiDelete(){
        try{ 
            console.log(this.props.movie)

            const response = await api.delete('/movie/' + this.props.movie._id)           
            
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
                            
                            <div className="ui stackable grid"> 
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

                            <div style={{display:'flex', justifyContent:'space-between', marginTop:"20px"}}>
                                <div>
                                    <div class="ui vertical inverted animated yellow button" onClick={() => this.props.returnMain(false, 0)} tabindex="0">
                                        <div class="hidden content">Back</div>
                                        <div class="visible content">
                                            <i class="arrow left icon"></i>
                                        </div>
                                    </div>
                                    <div class="ui vertical inverted animated button" tabindex="0">
                                        <div class="hidden content">Edit</div>
                                        <div class="visible content">
                                            <i class="pencil alternate icon"></i>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="ui vertical animated red button" tabindex="0" onClick={() => {this.apiDelete()}}>
                                    <div class="hidden content">Remove</div>
                                    <div class="visible content">
                                        <i class="trash icon"></i>
                                    </div>
                                </div>
                            </div>

                            
                            
                        </div>
                    </div>

            ); 
        }
    
    }
}

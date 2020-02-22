import React, { Component } from 'react';

import api from '../services/api'

export default class EditPanel extends Component {

    title = ''
    year = ''
    trailer = ''

    constructor(props){
        super(props)

        this.title = props.movie.Title
        this.year = props.movie.Year
        this.trailer = props.movie.Trailer
    }

    //Metodos de conexao com back end (axios)
    async apiUpdate(){
        try{ 
            await api.put('/movie/' + this.props.movie._id, { 
                Title:this.title, 
                Year:this.year, 
                Trailer:this.trailer
            })             

            this.props.returnDetails(false)
            
        }catch (e){
            console.log(e.response.data.error)
        }
    }

    render() {
        return [
            
                <div id="dialogBackground">
                    <div id="panel">
                        <h1 id="title">Edit Movie Details</h1>
                                       
                        <div className="ui inverted transparent left icon  input" id="loginInput">
                            <input type="text" placeholder="Title" defaultValue={this.title} onChange={txt => this.title = txt.target.value}/>
                            <i style={{marginLeft:'10px'}} className="book icon"></i>
                        </div>

                        <div className="ui inverted transparent left icon  input" id="loginInput">
                            <input type="text" placeholder="Year" defaultValue={this.year} onChange={txt => this.year = txt.target.value}/>
                            <i style={{marginLeft:'10px'}} className="calendar outline icon"></i>
                        </div>

                        <div className="ui inverted transparent left icon  input" id="loginInput">
                            <input type="text" placeholder="Trailer" defaultValue={this.trailer} onChange={txt => this.trailer = txt.target.value}/>
                            <i style={{marginLeft:'10px'}} className="film icon"></i>
                        </div>

                        <div>
                            <div class="ui vertical animated button" onPointerDown={() => this.props.returnDetails(false)} tabindex="0">
                                <div class="hidden content">Back</div>
                                <div class="visible content">
                                    <i class="arrow left icon"></i>
                                </div>
                            </div>
                            <div class="ui vertical animated green button" tabindex="0" onPointerDown={() => this.apiUpdate()}>
                                <div class="hidden content">Edit</div>
                                <div class="visible content">
                                    <i class="check circle outline icon"></i>
                                </div>
                            </div>                        
                        </div>                    
                    </div>
                </div> 
            
        ];        
    }
}

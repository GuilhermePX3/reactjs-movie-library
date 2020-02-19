import React, { Component } from 'react';

export default class Highlights extends Component {


    
    highlightMovie(index){
        return(
        <div class="sixteen wide column">
            <div>
                <div style={{height:'230px', width:'150px', backgroundColor:'#fff', borderRadius:'5px', marginRight:10, backgroundImage:`url(${this.props.movies[index].Poster})`, backgroundSize:'cover'}}/> 
            </div>

            <div>
                <h3>{this.props.movies[index].Title}</h3>
                <h5>{this.props.movies[index].Genre}</h5>
                <h4>{this.props.movies[index].Plot}</h4> 
            </div>
        </div>
        )
    }

    render() {
        return (
            <div>

                <div style={{padding:20}}>
                    <h2>Highlights</h2>
                </div>
            
                <div class="ui stackable grid" style={{margin:'8px'}}>

                    <div class="eight wide column">
                        {this.highlightMovie(3)}                        
                    </div>

                    <div class="eight wide column">
                        {this.highlightMovie(4)}                        
                    </div>

                </div>

            </div>        
        );
    }
}

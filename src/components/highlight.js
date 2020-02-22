import React, { Component } from 'react';

export default class Highlight extends Component {

    render() {
        return [
            <>
                <div className="three wide column" style={{marginBottom:20}}>
                    <div>
                        <div style={{height:'230px', width:'150px', backgroundColor:'#fff', borderRadius:'5px', marginRight:10, backgroundImage:`url(${this.props.movie.Poster})`, backgroundSize:'cover'}}/> 
                    </div>
                </div>
                <div className="five wide column">
                    <div>
                        <h3>{this.props.movie.Title.toUpperCase()}</h3>
                        <h5>{this.props.movie.Genre}</h5>
                        <h4>{this.props.movie.Plot}</h4> 
                    </div>
                </div>  
            </>
        ];        
    }
}
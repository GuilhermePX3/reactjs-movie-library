import React, { Component } from 'react';

import api from '../services/api'



export default class AuthPanel extends Component {

    state = {
        loginInfo:'',
        registerInfo:''
    }

    loginText = ''
    passwordText = ''

    r_email = ''
    r_name = ''
    r_password = ''

    //Metodos de conexao com back end (axios)
    async apiLogin(){
        try{ 
            const response = await api.post('/auth/login', { 
            email:this.loginText, password:this.passwordText })             

            this.props.loginAction(response.data.user)
            
        }catch (e){
            this.setState({loginInfo:e.response.data.error})
        }
    }

    async apiRegister(){

        if(this.r_name === '' || this.r_email === '' || this.r_password === '' ){
            this.setState({registerInfo:'Fill all required informations'})
            return
        }

        try{ 
            const response = await api.post('/auth/register', { 
                name:this.r_name , email:this.r_email, password:this.r_password 
            })

            

            this.props.loginAction(response.data.user)

        }catch (e){
            //this.setState({registerInfo:e.response.data.error})
        }
    }

    render() {
        return [
            
                <div id="dialogBackground">
                    <div id="panel">

                        <h1 id="title">LOGIN</h1>

                                       
                            <div className="ui inverted transparent left icon  input" id="loginInput">
                                <input type="username" placeholder="Login" onChange={txt => this.loginText = txt.target.value}/>
                                <i style={{marginLeft:'10px'}} className="user link icon"></i>
                            </div>
                            
                            <div className="ui inverted transparent left icon  input" id="loginInput">
                                <input type="password" placeholder="Password" onChange={txt => this.passwordText = txt.target.value}/>
                                <i style={{marginLeft:'10px'}} className="lock link icon"></i>
                            </div>

                            <a id="error">{this.state.loginInfo}</a>

                            <div onPointerUp={this.apiLogin.bind(this)}>
                                <button className="ui inverted yellow button">Login</button>
                            </div>
                        

                        <h1 id="title">REGISTER</h1>
                            
                            <div className="ui inverted transparent left icon  input" id="loginInput">
                                <input type="username" placeholder="Name" onChange={txt => this.r_name = txt.target.value}/>
                                <i style={{marginLeft:'10px'}} className="user link icon"></i>
                            </div>
                            
                            <div className="ui inverted transparent left icon  input" id="loginInput">
                                <input type="new-email" placeholder="Email" onChange={txt => this.r_email = txt.target.value}/>
                                <i style={{marginLeft:'10px'}} className="mail link icon"></i>
                            </div>

                            <div className="ui inverted transparent left icon  input" id="loginInput">
                                <input type="password" placeholder="Password" onChange={txt => this.r_password = txt.target.value}/>
                                <i style={{marginLeft:'10px'}} className="lock link icon"></i>
                            </div>

                            <a id="error">{this.state.registerInfo}</a>

                            <div>
                                <button className="ui inverted yellow button" onPointerUp={() => this.apiRegister()}>Register!</button>
                                <button className="ui inverted button" onPointerUp={() => this.props.hidePanel(false)}>Maybe Later</button>
                            </div>
                    
                    </div>
                </div> 
            
        ];        
    }
}

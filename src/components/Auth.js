import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getUser} from '../ducks/reducer'
import {withRouter} from "react-router-dom"

class Auth extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            id: ''
        }
    }

    handleInput = e => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }
    login = () => {
        const {username, password} = this.state
        axios.post('/auth/login', {username, password}).then(res => {
            console.log(res)
            this.setState({id: res.data.id})
            this.props.getUser(res.data)
            this.props.history.push('/dashboard')
        }).catch(err => alert(err.response.request.response))
    }
    register = () => {
        const {username, password} = this.state
        axios.post('/auth/register', {username, password}).then(res => {
            console.log(res)
            this.setState({id: res.data.id})
            this.props.getUser(res.data)
            this.props.history.push('/dashboard')
        }).catch(err => alert(err.response.request.response))
    }

    render(){
        return(
            <div>
                <img/>
                <h1>Helo</h1>
                <p>Username:</p>
                <input 
                name='username'
                value={this.state.username}
                onChange={e => this.handleInput(e)} />
                <p>Password:</p>
                <input
                name='password'
                value={this.state.password}
                onChange={e => this.handleInput(e)}
                type='password' />
                <button onClick={() => this.login()}>Login</button>
                <button onClick={() => this.register()}>Register</button>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {user: state.reducer.user}
}

export default connect(mapStateToProps, {getUser})(withRouter(Auth))
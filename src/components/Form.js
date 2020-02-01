import React, {Component} from 'react'
import axios from 'axios'

class Form extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            img: '',
            content: ''
        }
    }

    handleInput = e => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    post = () => {
        const {title, img, content} = this.state
        axios.post('/api/post', {title, img, content}).then(() => {
            this.props.history.push('/dashboard')
        }).catch(err => console.log(err))
    }
    render(){
        return(
            <div id='form'>
                <h1>New Post</h1>
                <p>Title:</p>
                <input 
                name='title'
                value={this.state.title}
                onChange={e=>this.handleInput(e)} />
                <img src={this.state.img || 'https://github.com/DevMountain/simulation-3/blob/master/assets/no_image.jpg?raw=true' }/>
                <p>Image URL:</p>
                <input 
                name='img'
                value={this.state.img}
                onChange={e => this.handleInput(e)} />
                <p>Content:</p>
                <input 
                name='content'
                value={this.state.content}
                onChange={e => this.handleInput(e)} />
                <button onClick={()=> this.post()}>Post</button>
            </div>
        )
    }
}

export default Form
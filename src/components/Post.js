import React, {Component} from 'react'
import axios from 'axios'

class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            img:'',
            content:'',
            author:'',
            authorPic:''
        }
    }

    componentDidMount(){
        console.log(this.props.match.params)
        axios.get(`/api/posts/${this.props.match.params.id}`).then(res => {
            console.log(res.data)
            const {title, img, content, author, authorPic} = res.data
            this.setState({
                title,
                img,
                content,
                author,
                authorPic
            })
        }).catch(err=>console.log(err))
    }


    render(){
        return(
            <div>
                <h1></h1>
                <img/>
                <p></p>
                <p></p>
                <img/>
            </div>
        )
    }
}

export default Post
import React, { Component } from "react";
import axios from "axios";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      img: "",
      content: "",
      username: "",
      authorPic: ""
    };
  }

  componentDidMount=() =>{
    console.log(this.props.match.params);
    axios
      .get(`/api/post/${this.props.match.params.id}`)
      .then(res => {
        console.log(res.data);
        const { title, img, content, username, profile_pic } = res.data[0];
        this.setState({
          title,
          img,
          content,
          username,
          authorPic: profile_pic
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { title, img, content, username, authorPic } = this.state;
    console.log(title, username)
    return (
      <div>
        <h1>{title}</h1>
        <img src={img} alt='' />
        <p> {content} </p>
        <p> {username}</p>
        <img src={authorPic} alt='' />
      </div>
    );
  }
}

export default Post;

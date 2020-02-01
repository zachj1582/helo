import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUser } from "../ducks/reducer";
import { withRouter } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      search: "",
      userPosts: true
    };
  }

  componentDidMount() {
    console.log(this.props.user);
    const { id } = this.props.user;
    const { search, userPosts } = this.state;
    axios
      .get("/auth/user")
      .then(res => {
        if (res.data === "No user on session") {
          this.props.history.push("/");
        } else {
          this.props.getUser(res.data);
        }
        axios
          .get(`/api/posts/${id}?search=${search}&userposts=${userPosts}`)
          .then(res => {
            this.setState({ posts: res.data });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  toggleCheck = () => {
      this.setState({userPosts: !this.state.userPosts})
  }

  render() {
    const { posts, search, userPosts } = this.state;
    let mappedPosts = posts.map(e => {
      return (
        <div key={e.id}>
          <h1>{e.title}</h1>
          <p>{e.username}</p>
          <img src={e.profile_pic || `https://robohash.org/${e.username}`} alt='' />

        </div>
      );
    });
    console.log("mapped", posts);
    return (
      <div>
        <div>
          <input
            placeholder="Search by Title"
            name="search"
            value={this.state.search}
            onChange={e => this.handleInput()}
          />
          <button>search icon</button>
          <button>Reset</button>
          <p>My Posts</p>
          <input type="checkbox" onClick={()=> this.toggleCheck()} checked={this.state.userPosts}/>
        </div>
        <div onClick={() => this.props.history.push("/post")}>
          {mappedPosts}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.reducer.user };
}

export default connect(mapStateToProps, { getUser })(withRouter(Dashboard));

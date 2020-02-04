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
    this.reRender();
  }

  reRender = () => {
    console.log("userPosts", this.state.userPosts);
    console.log('search', this.state.search)
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
  };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  toggleCheck = e => {
    this.setState({ userPosts: !this.state.userPosts });
    this.reRender();
  };

  reset = () => {
      this.setState({search:'' })
    this.reRender()
  }

  render() {
    const { posts, search } = this.state;
    let mappedPosts = posts.map(e => {
      return (
        <div key={e.id} onClick={() => this.props.history.push(`/post/${e.id}`)}>
          <h1>{e.title}</h1>
          <p>{e.username}</p>
          <img
            src={e.profile_pic || `https://robohash.org/${e.username}`}
            alt=""
          />
        </div>
      );
    });
    console.log("mapped", mappedPosts);
    console.log(mappedPosts.key)
    return (
      <div>
        <div>
          <input
            placeholder="Search by Title"
            name="search"
            value={this.state.search}
            onChange={e => this.handleInput(e)}
          />
          <button onClick={()=> this.reRender()}>search icon</button>
          <button onClick={()=> this.reset()}>Reset</button>
          <p>My Posts</p>
          <input
          name='userPosts'
            type="checkbox"
            onChange={e => this.toggleCheck()}
            checked={this.state.userPosts}
          />
        </div>
        <div >
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

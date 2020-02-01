import React, { Component } from "react";
import axios from "axios";
import {connect} from 'react-redux'
import {getUser} from '../ducks/reducer'

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
      console.log(this.props.user)
      const {id} = this.props.user
      const {search, userPosts} = this.state
    axios
      .get(`/api/posts/${id}?${search, userPosts}`)
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => console.log(err));
  }

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { posts, search, userPosts } = this.state;

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
          <input type="checkbox" />
        </div>
        <div onClick={() => this.props.history.push("/post")}>
          {/* {this.state.posts.map(e => {
            return (
              <div>
                title={e.title}
                name={e.username}
                author={e.author}
              </div>
            );
          })} */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {user: state.reducer.user}
}

export default connect(mapStateToProps, {getUser})(Dashboard);

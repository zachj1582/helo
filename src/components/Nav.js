import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

function Nav(props) {
  console.log(props);
  if (props.location.pathname === "/") {
    return <></>;
  } else {
    return (
      <div className='nav'>
        <img
          src={
            props.user.profile_pic ||
            `https://robohash.org/${props.user.username}`
          }
        />
        <p>{props.user.username}</p>
        <div onClick={() => props.history.push("/dashboard")}>
          home/dashboard
        </div>
        <div onClick={() => props.history.push("/form")}>new/form</div>
        <div
          onClick={() =>
            axios.post("/auth/logout").then(() => props.history.push("/"))
          }
        >
          logout
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.reducer.user };
}

export default connect(mapStateToProps)(withRouter(Nav));

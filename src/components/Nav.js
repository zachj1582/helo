import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

function Nav (props) {
    if (props.location.pathname === '/'){
        return <></>
    } else {
    return (
    <div>
       <div>profile pic</div>
       <div onClick={()=> props.history.push('/dashboard')}>home/dashboard</div>
       <div onClick={()=> props.history.push('/form')}>new/form</div>
       <div onClick={()=> axios.post('/auth/logout').then(()=> props.history.push('/'))}>logout</div>
    </div>
    )
    }
}

export default withRouter(Nav)
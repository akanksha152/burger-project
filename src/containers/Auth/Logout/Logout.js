import React , {Component} from 'react';
import * as actionCreators from '../../../store/actions/index';
import { Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class Logout extends Component{

    componentDidMount(){
        this.props.onlogout();
    }
    render(){
        return(
           <Redirect to ='/'/>
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onlogout: () => dispatch(actionCreators.authLogout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);
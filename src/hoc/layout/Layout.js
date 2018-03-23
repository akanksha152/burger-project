import React, {Component} from 'react';
import Aux1 from '../Aux1/Aux1';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component{
    state={
      showSideDrawer: false
    }
    closeSideHandler=()=>{
      this.setState({showSideDrawer: false});
    }
    sideDrawerToggleHandler=()=>{
      this.setState((prevState)=>{
        return { showSideDrawer : !prevState.showSideDrawer}
    
      });
    }
  render(){
  
    return(
 <Aux1>
      <Toolbar 
      isAuth={this.props.isAuth}
      drawerToggleClicked={this.sideDrawerToggleHandler}/>
      <SideDrawer  
      isAuth={this.props.isAuth}
      open={this.state.showSideDrawer}
      closed={this.closeSideHandler}/>
       <main className ={classes.content}>
          {this.props.children}
       </main>
  </Aux1>
    )
  }
}

const mapStateToProps = state =>{
  return{
       isAuth: state.auth.token!==null
  }
}


export default connect(mapStateToProps)(Layout);

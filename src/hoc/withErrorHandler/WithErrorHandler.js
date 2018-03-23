import React, {Component} from 'react';
import Aux1 from '../Aux1/Aux1';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios)=>{
    return class extends Component{
        state={
            error: null
        }
        componentWillMount(){
          this.reqInter=  axios.interceptors.request.use(req=>{
            this.setState({error :null});
            return req;
            });
         this.resInter =  axios.interceptors.response.use(res=>res, error=>{
            this.setState({error: error});
            });
        }

    //    componentWillUnmount(){
    //          axios.interceptors.request.reject(this.reqInter);
    //          axios.interceptors.response.reject(this.resInter);
    //    }

        errorConfirmedHandler=()=>{
              this.setState({error:null});
        }
        render(){
            return(
           <Aux1>
                <Modal show={this.state.error} clicked={this.errorConfirmedHandler}>
                    {this.state.error?this.state.error.message: null}
                </Modal>
                <WrappedComponent {...this.props} />
                
            </Aux1>
            )
        }
    }
    
  
}

export default withErrorHandler;
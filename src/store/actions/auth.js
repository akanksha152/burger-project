import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) =>{
     return{
         type: actionTypes.AUTH_SUCCESS,
         idToken: token,
         userId: userId
     }
}

export const authFail = (error) =>{
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}
export const authLogout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return{
        type: actionTypes.AUTH_LOGOUT,
    }
}



export const authTimeOut = (expirationTime) =>{
    return dispatch =>{
        setTimeout( () =>{
            dispatch(authLogout());
        }, expirationTime*1000)
    }
}




export const auth = (email, password, isSignUp) => {
    return dispatch => {
       dispatch(authStart());
       let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCd5rAOSo8bO6ja3vo99bchizcOZ__Kiao';
       if(!isSignUp){
           url= 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCd5rAOSo8bO6ja3vo99bchizcOZ__Kiao';
       }
        const authData = {
         	 email: email,
             password: "password",
             returnSecureToken: true
        };
     
        axios.post(url,  authData)
        .then(response=> {
               const expirationDate = new Date(new Date().getTime()+response.data.expiresIn*1000 );
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(authTimeOut(response.data.expiresIn));
        })
        .catch(err=> {
            dispatch(authFail(err.response.data.error));
          }
        );
    };
};

export const reDirectPath = (path) =>{
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () =>{
    return dispatch =>{
        const token = localStorage.getItem('token');
        const userId =localStorage.getItem('userId');
        if(!token){
            dispatch(authLogout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate> new Date()){
                dispatch(authSuccess(token, userId));
                dispatch(authTimeOut((expirationDate.getTime()-new Date().getTime())/1000));
            }
            else{
                dispatch(authLogout());
            }
        }
    }
}

import {createStore, applyMiddleware} from "redux";
import reducer from "./reducers";
import thunkMiddleware from 'redux-thunk'


const logMiddleware = ({ getState }) => (next) => (action) => {
    return next(action);
};

const stringMiddleware = () => (next) => (action) => {
    if(typeof action === 'string') {
        return next({
            type: action
        });
    };
    return next(action)
};


const store = createStore(reducer, applyMiddleware( thunkMiddleware, stringMiddleware, logMiddleware ));

// const myAction = (dispatch) => {
//     setTimeout( () => dispatch( {
//         type: 'DELAYED_ACTION'
//     } ), 2000 )
// }
//
// store.dispatch(myAction)

export default store
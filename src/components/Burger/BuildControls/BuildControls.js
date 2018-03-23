import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls=[
    {level: 'Bacon', type: 'bacon'},
    {level: 'Cheese', type: 'cheese'},
    {level: 'Meat', type: 'meat'},
    {level: 'Salad', type: 'salad'},
]

const BuildControls=(props)=>(

     <div className={classes.BuildControls}>
         <p>current price = <strong>{props.price.toFixed(2)}</strong></p>
         {controls.map(ctrl=>(
             <BuildControl 
             key={ctrl.level} 
             level={ctrl.level}
             added={() => props.ingredientsAdded(ctrl.type)}
             removed={()=>props.ingredientsRemoved(ctrl.type)}
             disabled={props.disabled[ctrl.type]}/>
         ))}
         <button 
         className={classes.OrderButton}
         disabled={!props.purchase}
         onClick={props.ordered}>{props.isAuthenticated?'ORDER NOW':"SignUp for order"} </button>
     </div>
)

export default BuildControls;
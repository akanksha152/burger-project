import React from 'react';
import classes from './BuildControl.css';

const BuildControl=(props)=>(
     <div className={classes.BuildControl}>
         <div className={classes.Label}> {props.level}</div>
         <button className={classes.Less} onClick={props.removed} disabled={props.disabled}> Less</button>
         <button className={classes.More} onClick={props.added}> Add </button>
         
     </div>
)

export default BuildControl;
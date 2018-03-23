import React from 'react';
import classes from './Order.css';

const Order = (props) => {
  let ingredients= [];
  for(let ingre in props.ingredients){
      ingredients.push({
          name: ingre,
          amount: props.ingredients[ingre]
      })
  }

  const ingredientOutput = ingredients.map((ig)=>{
      return <span
        style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
        }}
       key={ig.name}>{ig.name}({ig.amount})</span>
  })
    return (
        <div className={classes.Order}>
            <p>{ingredientOutput}</p>
            <p>total price:<strong>{props.totalPrice.toFixed(2)}</strong></p>
        </div>

    )

}


export default Order;
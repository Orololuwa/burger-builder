import React, { Component } from 'react';

import Aux from '../../../hoc/Auxs';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    // componentDidUpdate(){
    //     console.log("[Order Summary] DidUpdate");
    // }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: "capitalize"}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
            );
        })
    
        return(
            <Aux>
                <h3>Your Order</h3>
                <p>a delicious burger with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price}</strong></p>
                <p>Continue to checkout?</p>
                <Button type='Danger' clicked={this.props.cancel}>CANCEL</Button>
                <Button type='Success' clicked={this.props.continue}>CONTINUE</Button>
            </Aux>
        );
    }
}
export default OrderSummary;
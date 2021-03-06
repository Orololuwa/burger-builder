import React, { useState, useEffect } from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

const Checkout = (props) => {
    const [ingredients, setIngredients] = useState({
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0 
    });
    const [totalPrice,setTotalPrice] = useState(0)

    useEffect(()=>{
        const query = new URLSearchParams(props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0]==='price'){
                price=param[1];
            }else{
                ingredients[param[0]] = +param[1]
            }
        }
        setIngredients(ingredients);
        setTotalPrice(price);
    }, []);
     

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

    return(
        <div>
            <CheckoutSummary 
                ingredients={ingredients}
                checkoutCancelled={checkoutCancelledHandler}
                checkoutContinued={checkoutContinuedHandler}
            />
            <Route path={props.match.path + '/contact-data'} render={(props) => (<ContactData ingredients={ingredients} price={totalPrice} {...props}/>)}/>
        </div>
    );
}

export default Checkout;
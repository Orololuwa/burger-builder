import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.scss';
import axios from '../../../axios-orders';

const ContactData = (props) => {
    const [state, setState] = useState({
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    })
    const [loading, setLoading] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();
        console.log(props.ingredients);
        
        setLoading(true);
        const order = {
            ingredients: props.ingredients,
            price: props.price,
            customer : {
                name: 'Emmanuel Awolusi',
                address: {
                    street: 'Ope-Ifa Crescent',
                    zipCode: '100123',
                    country: 'Nigeria'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'express'
        }
        axios.post('/orders.json', order)
            .then(response => {
                setLoading(false);
                props.history.push('/');
            })
            .catch(error => {
                setLoading(false);
            });
    }

    let form = (
        <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
            <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
            <input className={classes.Input} type="text" name="street" placeholder="Street" />
            <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
            <Button type="Success" clicked={orderHandler}>ORDER</Button>
        </form>
    );
    if (loading){
        form = <Spinner />
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter Your Contact Data</h4>
            {form}
        </div>
    );
}

export default ContactData;
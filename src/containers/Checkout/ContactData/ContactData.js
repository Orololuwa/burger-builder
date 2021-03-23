import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.scss';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

const ContactData = (props) => {
    const [orderForm, updateOrderForm] = useState({
        name: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Your Name"
            },
            value: "",
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "street"
            },
            value: "",
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "ZIP Code"
            },
            value: "",
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Country"
            },
            value: "",
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: "input",
            elementConfig: {
                type: "email",
                placeholder: "Your Email"
            },
            value: "",
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: "select",
            elementConfig: {
                options: [
                    {value: "fastest", displayValue: "express"},
                    {value: "cheapest", displayValue: "normal"}
                ]
            },
            value: "fastest",
            validation: {},
            valid: true
        }
    })
    const [loading, setLoading] = useState(false);
    const [formIsValid, setFormValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();
        console.log(props.ingredients);
        const formData = {};
        for (let formElementIdentifier in orderForm){
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        
        setLoading(true);
        const order = {
            ingredients: props.ingredients,
            price: props.price,
            orderData: formData
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

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...orderForm};
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]}
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formValid = true;
        for (let inputIdentifier in updatedOrderForm){
            formValid = updatedOrderForm[inputIdentifier].valid && formValid;
        }
        updateOrderForm(updatedOrderForm);
        setFormValid(formValid);
    }

    const checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }

        return isValid;
    }

    const formElementsArray = [];
    for (let key in orderForm){
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        });
    }

    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => (
                <Input 
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    key={formElement.id}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    shouldValidate={formElement.config.validation}
                    changed={(event) => inputChangedHandler(event, formElement.id)}
                />
            ))}
            <Button type="Success" disabled={!formIsValid}>ORDER</Button>
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
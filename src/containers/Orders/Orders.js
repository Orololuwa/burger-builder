import React, { useEffect, useState } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const Orders = (props) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        axios.get('/orders.json')
            .then(req=>{
                const fetchedOrder=[];
                for (let key in req.data){
                    fetchedOrder.push({
                        ...req.data[key],
                        id: key
                    })
                }
                setOrders(fetchedOrder)
                setLoading(false);
            })
            .catch(err=>{
                setLoading(false);
            })
    },[])

    return(
        <div>
            {
                orders.map(order=>(
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                ))
            }
        </div>
    );
}

export default withErrorHandler(Orders, axios);
import React, { useEffect, useState } from 'react';
import CartItem from '../CartItem/CartItem';
import { useCookies } from "react-cookie";

const CartList = ({user}) => {
    const [products, setProducts] = useState(null);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")))
    const [totalPrice, setTotalPrice] = useState(0);
    const [successPurchase, setSuccessPurchase] = useState(false);
    const [error, setError] = useState(false);
    const [cookies, setCookies] = useCookies();
    
    useEffect(()=>{
        if (cart){
            console.log("cartfelcartlist", cart)
            //const cartArray = cart.split(",");
            //console.log(cartArray);
            setProducts(cart);
        } else {
            setProducts(null)
        }
    }, [cart])

    const handleCheckout = async () => {
        const orderItems = []
        const id = user.id
        const items = document.querySelectorAll(".card-item")
        items.forEach(item => {
            console.log(item.children[0]);
            const orderItem = {
                id: item.id,
                quantity: item.children[0].firstChild.value
            }

            orderItems.push(orderItem)
        });

        const res = await fetch("/api/v1/orders", {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookies.Authorization}`,
            },
            body: JSON.stringify({id:user.id,orderItems:orderItems}),
        })

        const jsonRes = await res.json();
        if (res.ok) {
            localStorage.setItem("cart", JSON.stringify([]))
            setCart([]);
            setSuccessPurchase(true);
            setError(false);
        } else {
            setError(true);
        }

    }

    return (
        <div className="container cart-list">
            {successPurchase && <div className="alert alert-success"> <h2>Successfuly purchased</h2></div>}
            {error && <div className="alert alert-danger"> <h2>Something went wrong!</h2></div>}
            {!products || !(cart.length) && <div>Shopping cart is empty</div>}
            
            {products && 
            products.map((product, index) => (
                
                <CartItem key={index} productId={product} setCart={setCart} totalPrice={totalPrice} setTotalPrice={setTotalPrice}/>
            ))}
          {products &&  <button className="btn btn-primary mt-3" onClick={handleCheckout}>Checkout</button>}
        </div>
    )
}

export default CartList;
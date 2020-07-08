import React from "react";
import './shop-header.css'
import {Link} from "react-router-dom";
import {connect} from 'react-redux'

const ShopHeader = ({numItems, total}) => {
    return(
        <header className="shop-header row">
            <Link to="/">
                <div className="logo text-dark">ReStore</div>
            </Link>
            <Link to="/cart">
                <div className="shopping-cart">
                    <i className="cart-icon fa fa-shopping-cart"/>
                    {numItems} items (${total})
                </div>
            </Link>
        </header>
    )
};

 const mapStateToProps = ({ shoppingCart: {totalCount, orderTotal} }) => {
     return {
         numItems: totalCount,
         total: orderTotal
     }
};

export default connect( mapStateToProps )(ShopHeader);
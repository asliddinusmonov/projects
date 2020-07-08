import React from "react";
import ShopHeader from "../shop-header";
import {HomePage, CartPage} from "../pages";
import {Route, Switch} from "react-router-dom";

const App = () => {
return (
    <main role="main" className={"container"}>
        <ShopHeader numItems={5} total={210}/>
            <Switch>
                <Route path='/' component={HomePage} exact />
                <Route path='/cartPage' component={CartPage} />
            </Switch>
    </main>
    )
};

export default App;
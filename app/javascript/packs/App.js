import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import BrandList from "../components/Brand/BrandList/BrandList";
import CategoryList from "../components/Category/CategoryList/CategoryList";
import LoginForm from "../components/Auth/Login/LoginForm";
import SignUpForm from "../components/Auth/SignUp/SignUpForm";
import Profile from "../components/Auth/Profile/Profile";
import AdminProfile from "../components/Auth/Profile/AdminProfile";
import SellerProfile from "../components/Auth/Profile/SellerProfile";
import CategoryForm from "../components/Category/CategoryForm/CategoryForm";
import CategoryUpdateForm from "../components/Category/CategoryUpdateForm/CategoryUpdateForm";
import BrandCreateForm from "../components/Brand/BrandCreateForm/BrandCreateForm";
import BrandUpdateForm from "../components/Brand/BrandUpdateForm/BrandUpdateForm";
import LandingPage from "../components/LandingPage/LandingPage";
import Navbar from "../components/Navbar/Navbar";
import NotFound from "../components/NotFound/NotFound";
import CartList from "../components/ShoppingCart/CartList/CartList";
import StoreForm from "../components/Store/StoreForm/StoreForm";
import StoreList from "../components/Store/StoreList/StoreList";
import SellerForm from "../components/Auth/SellersForm/SellerForm";
import UpdateForm from "../components/Auth/UpdateForm/UpdateForm";
import StoreUpdateForm from "../components/Store/StoreUpdateForm/StoreUpdateForm";

import ProductList from "../components/Product/ProductList/ProductList";
import ProductUpdateForm from "../components/Product/ProductUpdateForm/ProductUpdateForm";
import ProductCreateForm from "../components/Product/ProductCreateForm/ProductCreateForm";
import ProductPage from "../components/Product/ProductPage/ProductPage";
import Cart from "../components/Cart/Cart";
import OrderList from "../components/Order/OrderList/OrderList";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  logout = () => {
    document.cookie =
      "Authorization= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.localStorage.clear();
    this.setState({ user: null });
  };

  updateApp = () => {
    this.forceUpdate();
  };

  updateUser = (returnedUser) => {
    localStorage.setItem("user", JSON.stringify(returnedUser));
    this.setState({ user: returnedUser });
  };

  getCookie = (cname) => {
    console.log("inside");
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  componentDidMount() {
    if (this.getCookie("Authorization") !== "") {
      fetch("/api/v1/auto_login", {
        headers: {
          Authorization: `Bearer ${this.getCookie("Authorization")}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result.user);
          this.setState({ user: result.user });
        });
    }
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar user={this.state.user} logout={this.logout} />
          <div className="content container">
            <Switch>
              <Route exact path="/">
                <LandingPage />
              </Route>
              <Route
                exact
                path="/categories/:categoryId/:brandName/products/:productId"
                component={ProductPage}
              />
              <Route
                exact
                path="/categories/:categoryId/:brandName/brands/"
                component={ProductList}
              />
              <Route
                exact
                path="/products/:productId/update"
                component={ProductUpdateForm}
              />
              <Route
                exact
                path="/brands/:brandId/products/new"
                component={ProductCreateForm}
              />

              <Route exact path="/stores">
                <StoreList title="Stores" />
              </Route>

              <Route exact path="/categories">
                <CategoryList title="Categories" />
              </Route>

              <Route exact path="/categories">
                <CategoryList title="Categories" />
              </Route>
              <Route
                exact
                path="/categories/:categoryId/brands"
                component={BrandList}
              />
              <Route exact path="/categories/new" component={CategoryForm} />
              <Route
                exact
                path="/categories/:categoryId/update"
                component={CategoryUpdateForm}
              />
              <Route
                exact
                path="/categories/:categoryId/brands/new"
                component={BrandCreateForm}
              />
              <Route
                exact
                path="/brands/:brandId"
                component={BrandUpdateForm}
              />
              <Route path="/stores/new">
                <StoreForm />
              </Route>
              <Route path="/stores/:storeId/products">
                <ProductList />
              </Route>
              <Route path="/stores/:storeId/update">
                <StoreUpdateForm />
              </Route>
              <Route path="/login">
                <LoginForm setUser={this.updateUser} />
              </Route>
              <Route path="/signup">
                <SignUpForm />
              </Route>
              <Route exact path="/sellers/new">
                <SellerForm getCookie={this.getCookie} />
              </Route>
              <Route exact path="/sellers/:id/update">
                <UpdateForm getCookie={this.getCookie} />
              </Route>
              <Route path="/profile">
                {JSON.parse(localStorage.getItem("user")) ? (
                  JSON.parse(localStorage.getItem("user")).is_admin ? (
                    <AdminProfile
                      user={this.state.user}
                      setUser={this.updateUser}
                      getCookie={this.getCookie}
                    />
                  ) : JSON.parse(localStorage.getItem("user")).role ===
                    "seller" ? (
                    <SellerProfile
                      user={this.state.user}
                      getCookie={this.getCookie}
                    />
                  ) : (
                    <Profile
                      user={this.state.user}
                      setUser={this.updateUser}
                      getCookie={this.getCookie}
                    />
                  )
                ) : (
                  <Profile
                    user={this.state.user}
                    setUser={this.updateUser}
                    getCookie={this.getCookie}
                  />
                )}
              </Route>
              <Route path="/cart">
                {this.state.user && <CartList user={this.state.user} />}
              </Route>
              <Route path="/orders">
                {this.state.user && <OrderList user={this.state.user} />}
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

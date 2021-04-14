import React from "react";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TestPage from "./pages/TestPage";
import DetailPage from "./pages/DetailPage";
import HospitalPage from "./pages/hospital/HospitalPage";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import IndexPage from "./pages/category/IndexPage";
import CreatePage from "./pages/category/CreatePage";
import EditPage from "./pages/category/EditPage";
import UploadPage from "./pages/hospital/UploadPage";
import { ToastProvider, useToasts, Snack } from "react-toast-notifications";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MemberPage from "./pages/MemberPage";
import PrivateRoute from "./guard/auth";
import UserStoreProvider from "./context/UserContext";

//redux setup
import { Provider } from "react-redux";

//thunk setup
//import { createStore, applyMiddleware} from 'redux'
//import thunk from 'redux-thunk'
//const store = create


//import { createStore } from "redux";
//import rootReducer from "./redux/reducers/index";
import CartPage from './pages/CartPage'
import  configureStore  from './redux/configureStore'
import PdfReport from "./pages/report/PdfReport";
import ChartReport from "./pages/report/ChartReport";
const { store} = configureStore();


//const store = createStore(rootReducer);
const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <UserStoreProvider>
        <ToastProvider
          placement="top-center"
          autoDismiss
          autoDismissTimeout={3000}
        >
          <QueryClientProvider client={queryClient}>
            <Router basename={'/~wuttiwong/my-app'}>
              <NavBar />
              <Switch>
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route path="/about">
                  <AboutPage />
                </Route>
                <Route path="/product">
                  <ProductPage />
                </Route>
                <Route path="/testpage">
                  <TestPage />
                </Route>
                <Route path="/detail/:id/title/:title">
                  <DetailPage />
                </Route>
                <Route path="/hospital">
                  <HospitalPage />
                </Route>
                <Route path="/upload">
                  <UploadPage />
                </Route>
                <Route path="/cart">
                  <CartPage />
                </Route>

                <PrivateRoute path="/member">
                  <MemberPage />
                </PrivateRoute>
                <Route path="/register">
                  <RegisterPage />
                </Route>
                <Route path="/login">
                  <LoginPage />
                </Route>
                <Route path="/pdf">
                  <PdfReport />
                </Route>
                <Route path="/chart">
                  <ChartReport />
                </Route>
                <Route
                  path="/category"
                  render={({ match: { url } }) => (
                    <>
                      <Route path={`${url}/`} exact>
                        <IndexPage />
                      </Route>
                      <Route path={`${url}/create`}>
                        <CreatePage />
                      </Route>
                      <Route path={`${url}/edit/:id`}>
                        <EditPage />
                      </Route>
                    </>
                  )}
                ></Route>
              </Switch>
              <Footer />
            </Router>
          </QueryClientProvider>
        </ToastProvider>
      </UserStoreProvider>
    </Provider>
  );
}

export default App;


import './App.css';
import Home from './components/Home';
import Login from './components/Signup/Login';
import { AuthProvider } from "./contexts/AuthContext";
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NotAuthorised from './components/NotAuthorised';
import PrivateRoute from "./components/PrivateRoute";
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import Sidebar from './Sidebar'
import { useState } from "react";
import AdminPanel from './components/AdminPanel/AdminPanel';
import { ProductsProvider } from './contexts/ProductsContext';
import Products from './components/products/Products';

function App() {
  const [hideSb, setHideSb] = useState(false)


  return (

          <Router>
            <AuthProvider>
              <ProductsProvider>
              <Container className="d-flex "
                style={{ minHeight: "100vh" }}>
                  
                { !hideSb && <Sidebar/>}            
                    <PrivateRoute exact path="/" component={Home} hideSidebar={setHideSb} />
                    <Route path="/not-authorised" component={NotAuthorised} hideSidebar={setHideSb} />
                    <PrivateRoute path="/admin-panel" component={AdminPanel} roles={["Admin"]} hideSidebar={setHideSb} />
                    <PrivateRoute path="/products" component={Products} hideSidebar={setHideSb} />
                    <PrivateRoute path="/login" component={Login} hideSidebar={setHideSb} />
             </Container>
              </ProductsProvider>
            </AuthProvider>
          </Router>


      
  );
}

export default App;

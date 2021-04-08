import ItemHolder from '../views/ItemHolder';
import Navbar from '../components/Navbar';
import AllItems from '../views/AllItems';
import AddItem from '../views/AddItem';
import RegisterView from '../views/RegisterView';
import HomeView from '../views/HomeView';
import ItemDetailView from '../views/ItemDetailView';
import AdminView from '../views/AdminView';
import SettingsView from '../views/SettingsView';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CategoryView } from '../views/CategoryView';
import { useSelector } from "react-redux";

function RouterComponent() {

    const [homeComponent, setHomeComponent] = useState(null); 

    const user = useSelector(state => state);

    useEffect(() => {
        if (!user) {
            setHomeComponent(<HomeView />);
        } else if (user.role === "USER") {
            setHomeComponent(<ItemHolder />);
        } else if (user.role === "ADMIN") {
            setHomeComponent(<AdminView />);
        }
    }, [user])

    return (
        <Router>
        <Navbar />
        <Route 
            path='/'
            exact
            render={() => homeComponent} />
        <Route 
            path='/register'
            exact
            component={RegisterView} />
        <Route 
            path='/all'
            exact
            component={AllItems} />
        <Route 
            path='/item/:parameter'
            exact
            render={props => <AddItem {...props} />} />
        <Route 
            path='/categories'
            exact
            component={CategoryView} />
        <Route
            path='/items/:itemId'
            exact
            render={props => <ItemDetailView {...props} />}/>
        <Route 
            path='/settings'
            exact
            component={SettingsView} />
        </Router>
    );
}

export default RouterComponent;

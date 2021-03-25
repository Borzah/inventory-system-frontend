import './App.css';
import { useState } from 'react';
import ItemHolder from './views/ItemHolder';
import Navbar from './components/Navbar';
import AllItems from './views/AllItems';
import AddItem from './views/AddItem';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CurrentFolderContext } from "./contexts/CurrentFolderContext";
import { CategoriesContext } from './contexts/CategoriesContext'
import ItemDetailView from './views/ItemDetailView';
import { CategoryView } from './views/CategoryView';
import RegisterView from './views/RegisterView';
import HomeView from './views/HomeView';
import store from './store'
import { Provider } from 'react-redux'
import AdminView from './views/AdminView';

function App() {
  const [currentFolderContext, setCurrentFolderContext] = useState(null);
  const [categoriesContext, setCategoriesContext] = useState([]);

  return (
    <Provider store={store}>
    <CurrentFolderContext.Provider value={[currentFolderContext, setCurrentFolderContext]}>
    <CategoriesContext.Provider value={[categoriesContext, setCategoriesContext]}>
    <Router>
    <div className="App">
    <Navbar />
    <Route 
        path='/'
        exact
        component={HomeView} />
    <Route 
        path='/register'
        exact
        component={RegisterView} />
    <Route 
        path='/inventory'
        exact
        component={ItemHolder} />
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
        path='/admin'
        exact
        component={AdminView} />
    </div>
    </Router>
    </CategoriesContext.Provider>
    </CurrentFolderContext.Provider>
    </Provider>
  );
}

export default App;

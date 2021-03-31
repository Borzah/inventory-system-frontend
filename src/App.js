import './App.scss';
import ItemHolder from './views/ItemHolder';
import Navbar from './components/Navbar';
import AllItems from './views/AllItems';
import AddItem from './views/AddItem';
import RegisterView from './views/RegisterView';
import HomeView from './views/HomeView';
import store from './store';
import ItemDetailView from './views/ItemDetailView';
import AdminView from './views/AdminView';
import SettingsView from './views/SettingsView';
import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CurrentFolderContext } from "./contexts/CurrentFolderContext";
import { CategoriesContext } from './contexts/CategoriesContext';
import { CategoryView } from './views/CategoryView';
import { Provider } from 'react-redux';
import { ThemeContext } from './contexts/ThemeContext';

function App() {
    
  const [currentFolderContext, setCurrentFolderContext] = useState(null);
  const [categoriesContext, setCategoriesContext] = useState([]);
  const [themeContext, setThemeContext] = useState({
    backgroundTheme: "background-main",
    buttonTheme: "main-button",
    appTheme: "App-main",
    elementNode: "element-node-main"
  });

  return (
    <Provider store={store}>
    <ThemeContext.Provider value={[themeContext, setThemeContext]}>
    <CurrentFolderContext.Provider value={[currentFolderContext, setCurrentFolderContext]}>
    <CategoriesContext.Provider value={[categoriesContext, setCategoriesContext]}>
    <Router>
    <div className={`App ${themeContext.appTheme}`}>
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
    <Route 
        path='/settings'
        exact
        component={SettingsView} />
    </div>
    </Router>
    </CategoriesContext.Provider>
    </CurrentFolderContext.Provider>
    </ThemeContext.Provider>
    </Provider>
  );
}

export default App;

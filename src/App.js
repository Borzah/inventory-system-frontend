import './App.css';
import { useState } from 'react';
import ItemHolder from './views/ItemHolder';
import ClientNavbar from './components/ClientNavbar';
import AllItems from './views/AllItems';
import AddItem from './views/AddItem';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CurrentFolderContext } from "./contexts/CurrentFolderContext";
import ItemDetailView from './views/ItemDetailView';
import { CategoryView } from './views/CategoryView';
import RegisterView from './views/RegisterView';
import HomeView from './views/HomeView';
import store from './store'
import { Provider } from 'react-redux'

function App() {
  const [currentFolderContext, setCurrentFolderContext] = useState(null);

  return (
    <Provider store={store}>
    <CurrentFolderContext.Provider value={[currentFolderContext, setCurrentFolderContext]}>
    <Router>
    <div className="App">
    <ClientNavbar />
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
    </div>
    </Router>
    </CurrentFolderContext.Provider>
    </Provider>
  );
}

export default App;

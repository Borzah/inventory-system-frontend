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

function App() {
  const [currentFolderContext, setCurrentFolderContext] = useState(null);

  return (
    <CurrentFolderContext.Provider value={[currentFolderContext, setCurrentFolderContext]}>
    <Router>
    <div className="App">
    <ClientNavbar />
    <Route 
        path='/'
        exact
        component={ItemHolder} />
      <Route 
        path='/all'
        exact
        component={AllItems} />
      <Route 
        path='/add'
        exact
        component={AddItem} />
      <Route 
        path='/categories'
        exact
        component={CategoryView} />
      <Route
        path='/items/:itemId'
        render={props => <ItemDetailView {...props} />}/>
    </div>
    </Router>
    </CurrentFolderContext.Provider>
  );
}

export default App;

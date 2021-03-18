import './App.css';
import ItemHolder from './views/ItemHolder';
import ClientNavbar from './components/ClientNavbar';
import AllItems from './views/AllItems';
import AddItem from './views/AddItem';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
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
    </div>
    </Router>
  );
}

export default App;

import './App.scss';
import store from './store';
import { useState, useEffect } from 'react';
import { CurrentFolderContext } from "./contexts/CurrentFolderContext";
import { CategoriesContext } from './contexts/CategoriesContext';
import { Provider } from 'react-redux';
import { ThemeContext } from './contexts/ThemeContext';
import RouterComponent from './router/RouterComponent';

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
        <div className={`App ${themeContext.appTheme}`}>
        <RouterComponent />
        </div>
        </CategoriesContext.Provider>
        </CurrentFolderContext.Provider>
        </ThemeContext.Provider>
        </Provider>
    );
}

export default App;

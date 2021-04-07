import { useEffect, useContext } from 'react';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ThemeContext } from '../contexts/ThemeContext';
import { mainTheme, secondTheme, thirdTheme, fourthTheme } from '../themes';

const SettingsView = () => {

    const [themeContext, setThemeContext] = useContext(ThemeContext);

    const user = useSelector(state => state);
    
    const history = useHistory();

    useEffect(() => {
        if (typeof user === 'undefined') {
            history.push("/")
        }
    }, [])

    return (
        <div className="container mb-3 mt-3">

            <h2>
                <i className="fas fa-cog"></i> Settings
            </h2>
            
            <div className="container mb-5 mt-5 pb-3 pt-3 shadow-lg rounded">

                <h4>Color theme</h4>

                <div className="container overflow-hidden">
                    <div className="row">

                        <div className="col">

                                <div 
                                    className="theme-change-btn background-main mb-2 mt-2 mx-auto" 
                                    onClick={() => setThemeContext(mainTheme)}>

                                    {themeContext.appTheme === "App-main" ? 
                                    <i className="theme-change-check fas fa-check"></i> : ''}

                                </div>
                        </div>

                        <div className="col">

                            <div 
                                className="theme-change-btn background-secondary mb-2 mt-2 mx-auto" 
                                onClick={() => setThemeContext(secondTheme)}>

                                {themeContext.appTheme === "App-second" ? 
                                <i className="theme-change-check fas fa-check"></i> : ''}

                            </div>
                        </div>

                        <div className="col">

                            <div 
                                className="theme-change-btn background-third mb-2 mt-2 mx-auto" 
                                onClick={() => setThemeContext(thirdTheme)}>

                                {themeContext.appTheme === "App-third" ? 
                                <i className="theme-change-check fas fa-check"></i> : ''}

                            </div>
                        </div>

                        <div className="col">

                            <div 
                                className="theme-change-btn background-fourth mb-2 mt-2 mx-auto" 
                                onClick={() => setThemeContext(fourthTheme)}>

                                {themeContext.appTheme === "App-fourth" ? 
                                <i className="theme-change-check fas fa-check"></i> : ''}
                                
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default SettingsView;

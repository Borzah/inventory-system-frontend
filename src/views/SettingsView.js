import { useEffect, useContext } from 'react'
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ThemeContext } from '../contexts/ThemeContext';
import { mainTheme, secondTheme, thirdTheme, fourthTheme } from '../themes'

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
            <h2><i className="fas fa-cog"></i> Settings</h2>
            
            <div className="container mb-5 mt-5 pb-3 pt-3 shadow-lg rounded">

                <h4>Color theme</h4>

                <div onClick={() => setThemeContext(mainTheme)}>Main</div>
                <div onClick={() => setThemeContext(secondTheme)}>Second</div>
                <div onClick={() => setThemeContext(thirdTheme)}>Third</div>
                <div onClick={() => setThemeContext(fourthTheme)}>Fourth</div>

            </div>
        </div>
    )
}

export default SettingsView;

import { useContext } from 'react'
import HomeScreen from './HomeScreen'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'
import WelcomeScreen from './WelcomeScreen'
import ToolBar from './ToolBar';

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
    
    if (auth.loggedIn)
        return (
            
        <HomeScreen />
        )
    else
        return <WelcomeScreen />
        // return <SplashScreen />
}
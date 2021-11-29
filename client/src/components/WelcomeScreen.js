import { useContext } from 'react'
import Button from '@mui/material/Button';
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import { Link } from 'react-router-dom'

export default function WelcomeScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const handleGuestLogin = () => {
        console.log("logging in as guest...")
        //handleMenuClose();
        //auth.logoutUser(store);
        //initialVisible = false;
        //change to actual guest login later
        auth.loginUser({
            userName: "lolak",
            password: "123456789",
        }, store);
        if(auth.errMsg){
            console.log(auth.errMsg);
          }
    }

    return (
        <div id="welcome-screen">
            <h>WELCOME<br />
            TO THE</h> <br/>
            <h>TOP 5 LISTER</h><br/>
            <h>This site lets you create top five lists and interact
                with the lists of other users!
            </h>
            <Button class="welcome-button"><Link to='/register/' style={{ textDecoration: 'none', color: "black" }}>Create New Account</Link></Button><br />
            <Button class="welcome-button"><Link to='/login/' style={{ textDecoration: 'none', color: "black" }}>Login</Link></Button><br />
            <Button class="welcome-button" onClick={handleGuestLogin}>Continue as Guest</Button><br />
        </div>
    )
}
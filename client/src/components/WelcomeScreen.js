import { useContext } from 'react'
import Button from '@mui/material/Button';
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import { Link } from 'react-router-dom'
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';

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
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <Typography sx={{fontSize:"72pt"}}>WELCOME TO THE TOP 5 LISTER</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography></Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography sx={{fontSize:"48pt"}}>This site lets you create top five lists and interact
                with the lists of other users!</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography></Typography>
                </Grid>
                <Grid item xs={4} sx={{marginLeft:"150px"}}>
                    <Button class="welcome-button"><Link to='/register/' style={{ textDecoration: 'none', color: "black" }}>Create New Account</Link></Button><br />
                </Grid>
                <Grid item xs={2}>
                    <Button class="welcome-button"><Link to='/login/' style={{ textDecoration: 'none', color: "black" }}>Login</Link></Button><br />
                </Grid>
                <Grid item xs={4}>
                    <Button class="welcome-button" onClick={handleGuestLogin}>Continue as Guest</Button><br />
                </Grid>

            </Grid>
            {/* <h>WELCOME<br />
            TO THE</h> <br/>
            <h>TOP 5 LISTER</h><br/>
            <h>This site lets you create top five lists and interact
                with the lists of other users!
            </h>
            <Button class="welcome-button"><Link to='/register/' style={{ textDecoration: 'none', color: "black" }}>Create New Account</Link></Button><br />
            <Button class="welcome-button"><Link to='/login/' style={{ textDecoration: 'none', color: "black" }}>Login</Link></Button><br />
            <Button class="welcome-button" onClick={handleGuestLogin}>Continue as Guest</Button><br /> */}
        </div>
    )
}
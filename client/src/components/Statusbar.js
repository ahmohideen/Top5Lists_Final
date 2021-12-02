import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import AuthContext from '../auth'

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    
    let text ="";
    let addButton = "";
    // if (store.currentList)
    //     text = store.currentList.name;
    
    const handleCreateNewList = () => {
        console.log("making list...")
        store.createNewList();
    }

    if(auth.user){
        text = "Your Lists";
        addButton = (
            <IconButton onClick={handleCreateNewList} >
                <AddIcon sx={{ fontSize: '75px', color: "black"}}/>
            </IconButton>
            )
    }
    

    return (
        // <div id="top5-statusbar">
        //     <Typography variant="h4">{text}</Typography>
        // </div>
        <div id="top5-statusbar">
            {addButton}
            <Typography variant="h2">{text}</Typography>
        </div>
    );
}

export default Statusbar;
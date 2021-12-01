import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    let text ="";
    if (store.currentList)
        text = store.currentList.name;
    
    const handleCreateNewList = () => {
        console.log("making list...")
        store.createNewList();
    }
    return (
        // <div id="top5-statusbar">
        //     <Typography variant="h4">{text}</Typography>
        // </div>
        <div id="top5-statusbar">
            <IconButton onClick={handleCreateNewList} >
            <AddIcon sx={{ fontSize: '75px', color: "black"}}/>
            </IconButton>
            <Typography variant="h2">Your Lists</Typography>
        </div>
    );
}

export default Statusbar;
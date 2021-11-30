import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import { ListItemText, TextField } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

function Top5ItemBox(props) {
    const { store } = useContext(GlobalStoreContext);
    const { items } = props;

    let top5Item = 
    <Box sx={{bgcolor: "pink", p: 1, flexGrow: .5, height: "90%"}}>
        <List >
            <ListItem >
                <Typography sx={{fontSize:55}}>1. {items[0]}</Typography>
            </ListItem>
            
            <ListItem>
            <Typography sx={{fontSize:55}}>2. {items[1]}</Typography>
            </ListItem>
            <ListItem>
            <Typography sx={{fontSize:55}}>3. {items[2]}</Typography>
            </ListItem>
            <ListItem>
            <Typography sx={{fontSize:55}}>4. {items[3]}</Typography>
            </ListItem>
            <ListItem>
            <Typography sx={{fontSize:55}}>5. {items[4]}</Typography>
            </ListItem>
        </List>
    </Box>

    return (
        top5Item
    );
}

export default Top5ItemBox;
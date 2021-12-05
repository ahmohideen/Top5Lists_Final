import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import { ListItemText, TextField } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

function Top5ItemBox(props) {
    const { store } = useContext(GlobalStoreContext);
    const { items, votes } = props;

    let vArray = ["", "", "", "", ""]
    let v1, v2, v3, v4, v5 = ""
    if(votes){
        vArray = votes;
        v1 = <ListItem >
        <Typography sx={{fontSize:18, marginLeft:"60px"}}>{vArray[0]} votes</Typography>
        </ListItem>
        v2 = <ListItem >
        <Typography sx={{fontSize:18, marginLeft:"60px"}}>{vArray[1]} votes</Typography>
        </ListItem>
        v3 = <ListItem >
        <Typography sx={{fontSize:18, marginLeft:"60px"}}>{vArray[2]} votes</Typography>
        </ListItem>
        v4 = <ListItem >
        <Typography sx={{fontSize:18, marginLeft:"60px"}}>{vArray[3]} votes</Typography>
        </ListItem>
        v5 = <ListItem >
        <Typography sx={{fontSize:18, marginLeft:"60px"}}>{vArray[4]} votes</Typography>
        </ListItem>
    }

    


    let top5Item = 
    <Box sx={{bgcolor: "pink", p: 1, flexGrow: .5, height: "90%"}}>
        <List >
            <ListItem >
                <Typography sx={{fontSize:55}}>1. {items[0]}</Typography>
            </ListItem>
            {v1}
            
            <ListItem>
            <Typography sx={{fontSize:55}}>2. {items[1]}</Typography>
            </ListItem>
            {v2}

            <ListItem>
            <Typography sx={{fontSize:55}}>3. {items[2]}</Typography>
            </ListItem>
            {v3}

            <ListItem>
            <Typography sx={{fontSize:55}}>4. {items[3]}</Typography>
            </ListItem>
            {v4}

            <ListItem>
            <Typography sx={{fontSize:55}}>5. {items[4]}</Typography>
            </ListItem>
            {v5}
        </List>
    </Box>

    return (
        top5Item
    );
}

export default Top5ItemBox;
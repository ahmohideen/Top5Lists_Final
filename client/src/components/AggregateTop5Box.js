import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import { ListItemText, TextField } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

function AggregateTop5Box(props) {
    const { store } = useContext(GlobalStoreContext);
    const { items } = props;

    //ITEMS IS AN ARRAY OF OBJECTS

    let itemArray = []
    let voteArray = []
    if(store){
        items.forEach(element => {
            itemArray.push(element.item)
            voteArray.push(element.vote)
        });
    }
    


    let top5Item = 
    <Box sx={{bgcolor: "pink", p: 1, flexGrow: .5, height: "90%"}}>
        <List >
            <ListItem >
                <Typography sx={{fontSize:55}}>1. {itemArray[0]}</Typography>
            </ListItem>
            <ListItem >
                <Typography sx={{fontSize:18, marginLeft:"60px"}}>{voteArray[0]} votes</Typography>
            </ListItem>
            
            <ListItem>
            <Typography sx={{fontSize:55}}>2. {itemArray[1]}</Typography>
            </ListItem>
            <ListItem >
                <Typography sx={{fontSize:18, marginLeft:"60px"}}>{voteArray[1]} votes</Typography>
            </ListItem>

            <ListItem>
            <Typography sx={{fontSize:55}}>3. {itemArray[2]}</Typography>
            </ListItem>
            <ListItem >
                <Typography sx={{fontSize:18, marginLeft:"60px"}}>{voteArray[2]} votes</Typography>
            </ListItem>

            <ListItem>
            <Typography sx={{fontSize:55}}>4. {itemArray[3]}</Typography>
            </ListItem>
            <ListItem >
                <Typography sx={{fontSize:18, marginLeft:"60px"}}>{voteArray[3]} votes</Typography>
            </ListItem>

            <ListItem>
            <Typography sx={{fontSize:55}}>5. {itemArray[4]}</Typography>
            </ListItem>
            <ListItem >
                <Typography sx={{fontSize:18, marginLeft:"60px"}}>{voteArray[4]} votes</Typography>
            </ListItem>
        </List>
    </Box>

    return (
        top5Item
    );
}

export default AggregateTop5Box;
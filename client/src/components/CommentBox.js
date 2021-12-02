import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import { ListItemText, TextField } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";

function CommentBox(props) {
    const { store } = useContext(GlobalStoreContext);
    //const { comments } = props;

    let testCommentsNamePair = {userName: "lolak", comment: "wow, i hate it here"}

    let commentBox = 
    <Box className="comment-test" sx={{ flexGrow: 1, width: "500px"}}>
    <Paper elevation={0} sx={{bgcolor: "pink", height: "90%", width:"100%"}}>
        {testCommentsNamePair.comment}
    </Paper>

    </Box>
        
   
    return (
        commentBox
    );
}

export default CommentBox;
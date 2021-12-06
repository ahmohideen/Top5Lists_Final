import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import { ListItemText } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";


function CommentBox(props) {
    const { store } = useContext(GlobalStoreContext);
    const { color} = props;

    useEffect(() => {
        console.log("in comments!")
        console.log(store.currentList);
        //store.loadIdNamePairs();
    }, );

    let comments = [];
    if(store.currentList){
        comments = store.currentList.comments;
    }
    // if(store.currentList){
    //     comments = store.currentList.comments;
    // }

    function addComment(event){
        //store.addComment(event.target.value);
        //in add comment we'll get the user there
        if(event.keyCode == 13){
            console.log("enter pressed in comment...")
            console.log('value ', event.target.value);
            //console.log(wId);
            if(event.target.value===""){
              //dont do anything
            }
            else{
                store.addComment(event.target.value);
            }
            
         }
    }

    

    //let comments = [{userName: "lolak", comment: "wow, i hate it here"}, {userName: "zz", comment: "ahhhh"}, {userName: "lolak", comment: "blah"}]

    let testCommentsNamePair = {userName: "lolak", comment: "wow, i hate it here"}

    

    let commentBox = 
    <Box sx={{bgcolor: color, p: 1, flexGrow: .75, height: "90%"}}>
    <List sx={{fontSize: "18pt"}}>

        {
                //store.idNamePairs.map((pair) => (
                    comments.map((element) => (
                        <div>
                        <ListItem sx={{bgcolor: "pink"}}>
                        <Grid>
                        <Grid item xs={6}> 
                        <Typography sx={{fontSize:"12pt", color:"purple"}}>{element.userName}</Typography>
                        </Grid>
            
                        <Typography sx={{fontSize:"18pt"}}>{element.comment}</Typography>
                        </Grid>
                    </ListItem> 
            
                    <ListItem sx={{bgcolor: color}}>
                    </ListItem>
                    </div>
                ) )
        }
        
        {/* <ListItem sx={{bgcolor: "pink"}}>
            nye
        </ListItem>
        <ListItem sx={{bgcolor: color}}>
        </ListItem>

        <ListItem>
            kuku
        </ListItem>

        <ListItem>
            teehee
        </ListItem> */}

    </List>
    <TextField sx={{bgcolor: "white", width:"700px"}} onKeyDown={addComment}> </TextField>
    </Box>

    // <Box className="comment-test" sx={{ flexGrow: 1}}>
    // <Paper elevation={0} sx={{bgcolor: "pink", width: "500px", height: "100%", marginRight:"100px" }}>
    //     {testCommentsNamePair.comment}
    // </Paper>

    // </Box>
        
   
    return (
        commentBox
    );
}

export default CommentBox;
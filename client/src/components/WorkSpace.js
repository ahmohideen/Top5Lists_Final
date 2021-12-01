import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { GlobalStoreContext } from '../store'
import ToolBar from './ToolBar';
import List from '@mui/material/List';
import ListCard from './ListCard.js';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const WorkSpace = () => {
    const { store } = useContext(GlobalStoreContext);
    const [titleTextField, setTitleTextField] = useState("");


    let listCard = "";
    if (store) {
       console.log("we're in workspace...")
    }
    let items = ""
    let title= ""
    if (store.currentList){
        title = store.currentList.name;
        items = store.currentList.items;
        console.log(store.currentList);
    }
    else{
        items = ["", "", "", "", ""]
    }

    //store.saveList()
    //vs
    //store.publishList()

    function handleSaveList(event){
        //let id = "list-" + idNamePair._id
        //store.changeListName(id, titleTextField);
    }

    function handlePublishList(event){

    }

    function changeTitleTextField(event) {
        let newText = event.target.value;
        setTitleTextField(newText);
        console.log(titleTextField);
    }
    
    // <List>
        <Paper elevation={0} sx={{ 
                            width: "80%",
                            height: "12%",
                            marginLeft: "200px",
                            marginBottom:"100px",
                            fontSize:'56pt', bgcolor: "#da9c00", textAlign:"center" }}>
                             Fake Data </Paper>
    {/* </List>  */}

    let tempItem = "hello world"
    

    return (
        <div id="top5-list-selector">
            <div id="list-selector-heading">
            <ToolBar />
            </div>
           
            <div id="list-selector-list">

                <Box sx={{ p: 1,flexGrow: 1 }}>
                
                    <Paper elevation={0} sx={{ width: "100%",
                        height: "100%",
                        fontSize:'36pt', bgcolor: "#d3d4f8", 
                        border: "solid 1px" }}>
                    <TextField id="workspace-list-title" onChange={changeTitleTextField} sx={{bgcolor:"white", width: "30%", marginLeft: "50px", marginTop:"10px"}}
                    defaultValue={title}></TextField>
                    
                        <Paper elevation={0} sx={{ 
                        width: "90%",
                        height: "75%",
                        marginLeft: "50px",
                        marginTop:"10px",
                        fontSize:'36pt', bgcolor: "#2d2d74" }}>
                       
                        <List>

                            <Grid container direction={'row'}>
                            <Paper elevation={0} sx={{ 
                            width: "4%",
                            height: "12%",
                            marginLeft: "50px",
                            marginTop:"40px",
                            fontSize:'56pt', bgcolor: "#da9c00", textAlign:"center" }}>
                            1. </Paper>
                            
                             <TextField 
                             inputProps={{style: {fontSize: 20}}}
                             InputLabelProps={{style: {fontSize: 24}}}
                             multiline={true}
                             rows={2}
                             sx={{width: "80%",
                            height: "30%",
                            marginLeft: "20px",
                            marginTop:"40px", bgcolor: "#da9c00", textAlign:"left", outline: "none" }} 
                            defaultValue={items[0]}></TextField>
                            </Grid>
                            <Grid container direction={'row'}>
                            <Paper elevation={0} sx={{ 
                            width: "4%",
                            height: "12%",
                            marginLeft: "50px",
                            marginTop:"40px",
                            fontSize:'56pt', bgcolor: "#da9c00", textAlign:"center" }}>
                            2. </Paper>
                            
                             <TextField 
                             multiline={true}
                             rows={2}
                             sx={{width: "80%",
                            height: "30%",
                            marginLeft: "20px",
                            marginTop:"40px",
                            fontSize: 100, bgcolor: "#da9c00", textAlign:"left", outline: "none" }} 
                            defaultValue={items[1]}></TextField>
                            </Grid>

                            <Grid container direction={'row'}>
                            <Paper elevation={0} sx={{ 
                            width: "4%",
                            height: "12%",
                            marginLeft: "50px",
                            marginTop:"40px",
                            fontSize:'56pt', bgcolor: "#da9c00", textAlign:"center" }}>
                            3. </Paper>
                            
                             <TextField 
                             multiline={true}
                             rows={2}
                             sx={{width: "80%",
                            height: "30%",
                            marginLeft: "20px",
                            marginTop:"40px",
                            fontSize: 100, bgcolor: "#da9c00", textAlign:"left", outline: "none" }} 
                            defaultValue={items[2]}></TextField>
                            </Grid>
                            
                            <Grid container direction={'row'}>
                            <Paper elevation={0} sx={{ 
                            width: "4%",
                            height: "12%",
                            marginLeft: "50px",
                            marginTop:"40px",
                            fontSize:'56pt', bgcolor: "#da9c00", textAlign:"center" }}>
                            4. </Paper>
                            
                             <TextField 
                             multiline={true}
                             rows={2}
                             sx={{width: "80%",
                            height: "30%",
                            marginLeft: "20px",
                            marginTop:"40px",
                            fontSize: 100, bgcolor: "#da9c00", textAlign:"left", outline: "none" }} 
                            defaultValue={items[3]}></TextField>
                            </Grid>
                            
                            <Grid container direction={'row'}>
                            <Paper elevation={0} sx={{ 
                            width: "4%",
                            height: "12%",
                            marginLeft: "50px",
                            marginTop:"40px",
                            fontSize:'56pt', bgcolor: "#da9c00", textAlign:"center" }}>
                            5. </Paper>
                            
                             <TextField 
                             multiline={true}
                             rows={2}
                             sx={{width: "80%",
                            height: "30%",
                            marginLeft: "20px",
                            marginTop:"40px",
                            fontSize: 100, bgcolor: "#da9c00", textAlign:"left", outline: "none" }} 
                            defaultValue={items[4]}></TextField>
                            </Grid>
                        </List>

                        <Stack spacing={2} direction="row" sx={{
                            marginLeft: "1500px",
                            marginTop: "80px"
                        }}>
                                <Button disableElevation
                                onClick={handleSaveList}
                                sx={{
                                bgcolor: "#c4c4c4",
                                width: "250px",
                                height: "80px",
                                fontSize: "36pt",
                                color: "black",
                                '&:hover': {
                                    bgcolor: "#c4c4c4",
                                    boxShadow: 'none'
                                  }
                                }}> Save</Button>
                                <Button disabledElevation
                                sx={{
                                    bgcolor: "#c4c4c4",
                                    width: "250px",
                                    height: "80px",
                                    fontSize: "36pt",
                                    color: "black",
                                    '&:hover': {
                                        bgcolor: "#c4c4c4",
                                        boxShadow: 'none'
                                      }
                                    }}>Publish</Button>
                        </Stack>
                        
                        {/* {items} */}
                        </Paper>
                    
                    </Paper>
                    
                </Box>
            </div>
        </div>
        )
}

export default WorkSpace;
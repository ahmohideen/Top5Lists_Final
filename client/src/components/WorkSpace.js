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
    

    let dataArray = ["", "", "", "", ""];
    let listTitle = "";
    
    useEffect(() => {
        //console.log(window.location.href);
        store.loadIdNamePairs();
        store.setCurrentList(window.location.href.split('/top5list/')[1]);
        // async function fetchList() {
        //     let response = await store.setCurrentList(window.location.href.split('/top5list/')[1])
        //     console.log(response)
        //   }
      
        //   fetchList()
    }, []);

    
    let listCard = "";
    let wId = window.location.href.split('/top5list/')[1];
    if (store) {
       console.log("we're in workspace...")
       store.idNamePairs.forEach(element => {
           if(element._id === wId){
                listTitle = element.name;
           }
       });
       console.log(listTitle);
    //    store.loadIdNamePairs()
    //    console.log(store.idNamePairs);
    }
    let items = ""
    let title= ""
    let id = ""
    let publishCondition = true;
    if (store.currentList){
        title = store.currentList.name;
        //store.getListName
        items = store.currentList.items;
        id = store.currentList._id;
        // console.log(store.currentList);
        // console.log(title);
        // console.log(items);
        // console.log(id);
        
        dataArray = items;
        listTitle = title;
        if(dataArray.includes("") == false){
            publishCondition = false
        }
        //aight we're also going to check the list name stuff here then
        
    }
    else{
        items = ["", "", "", "", ""]
    }
    
    // let counter = 1
    // if(counter===1){
    //     setTitleTextField(title);
    //     counter = counter+ 1;
    // }
    
    
    
    //store.saveList()
    //vs
    //store.publishList()

    function handleSaveList(event){
        //let id = "list-" + idNamePair._id
        //store.changeListName(id, titleTextField);
        console.log(titleTextField);
        console.log(dataArray);
        store.updateItems(dataArray);
        store.updateName(store.currentList, listTitle);
        //store.changeListName(id, titleTextField);
    }

    function updateDataArray(val, index){
        dataArray[index] = val
    }

    function updateTitle(val){
        listTitle=val;
    }

    function handlePublishList(event){

        if(dataArray.includes("")){
            //button should be disabled
            //since that's not working, guess we'll just check in here lol
        }
        publishCondition = false
        //when we publish a list, we-->
        //set published to TRUE 
        //immediatley return to the homescreen
        //lists cannot be published if
        //a, they have empty strings in items
        //or b, one list name matches another for a user
    }

    function changeTitleTextField(event) {
        let newText = event.target.value;
        setTitleTextField(newText);
        title = newText;
        console.log(titleTextField);
    }


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
                    {/* <TextField 
                    sx={{bgcolor:"white", width: "30%", marginLeft: "50px", marginTop:"10px", color:"black"}}
                    defaultValue={title}></TextField> */}
                    <TextField    
                        inputProps={{style: {fontSize: 12}}}
                        InputLabelProps={{style: {fontSize: 12}}}
                        sx={{width: "30%",
                        marginLeft: "50px",
                        marginTop:"10px", bgcolor: "white", textAlign:"left", outline: "none" }} 
                        defaultValue={listTitle}
                        onChange={(e)=> {updateTitle(e.target.value)} }
                        ></TextField>
                    
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
                             onChange={(e)=> {updateDataArray(e.target.value, 0)}}
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
                             onChange={(e)=> {updateDataArray(e.target.value, 1)}}
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
                             onChange={(e)=> {updateDataArray(e.target.value, 2)}}
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
                             onChange={(e)=> {updateDataArray(e.target.value, 3)}}
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
                             onChange={(e)=> {updateDataArray(e.target.value, 4)}}
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
                                disabled={publishCondition}
                                //disabled={published}
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
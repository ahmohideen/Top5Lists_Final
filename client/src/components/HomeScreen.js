import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import DeleteModal from './DeleteModal';
import ToolBar from './ToolBar';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FunctionsIcon from '@mui/icons-material/Functions';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import AuthContext from '../auth'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        //backgroundColor: alpha(theme.palette.common.white, 0.15),
        backgroundColor: 'white',
        '&:hover': {
          backgroundColor: 'white',
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '20ch',
          },
        },
      }));

    useEffect(() => {
        store.loadAggregateLists();
        store.loadIdNamePairs();
        
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    function buttonClicked() {
        console.log(store.allLists);
        store.idNamePairs.map((pair) => (
            console.log(pair)
        ))
    }

    //let allLists =  store.getAllLists();
    //console.log(allLists);

    //should we filter idnamepairs here, or later??
    let userName = ""
    let homeList = []
    if(store){
        userName = auth.user.userName;
        //console.log(userName);
        let homeIdNamePairs = store.idNamePairs;
        let allLists = store.allLists;
        for(let x = 0; x < homeIdNamePairs.length; x++){
            if(homeIdNamePairs[x]._id === allLists[x]._id){
                // console.log("match!")
                // console.log(allLists[x].userName);
                if(allLists[x].userName === userName){
                    homeList.push(homeIdNamePairs[x]);
                    //console.log(homeList);
                }
            }
        }
        //console.log("our filtered home list");
        //console.log(homeList);
    }

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%'}}>
            {
                //store.idNamePairs.map((pair) => (
                    homeList.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <div id="top5-list-selector">
            <div id="list-selector-heading">
            <ToolBar />
            {/* <Button onClick={buttonClicked}>hello</Button> */}
            <br />
            {/* <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab> */}
                {/* <Typography variant="h2">Your Lists</Typography> */}
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
                <DeleteModal />
            </div>
        </div>)
}

export default HomeScreen;
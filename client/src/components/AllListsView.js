import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ToolBar from './ToolBar';
import List from '@mui/material/List';
import ListCard from './ListCard.js'
import AuthContext from '../auth'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const AllListsView = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
      
    useEffect(() => {
        console.log("switched to all lists view")
        store.loadIdNamePairs();
        
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {

        let aList = [];
        let userName = auth.user.userName;
        //console.log(userName);
        let homeIdNamePairs = store.idNamePairs;
        let allLists = store.allLists;
        for(let x = 0; x < homeIdNamePairs.length; x++){
            if(homeIdNamePairs[x]._id === allLists[x]._id){
                // console.log("match!")
                // console.log(allLists[x].userName);
                if(allLists[x].published === true && allLists[x].hasOwnProperty("userName") === true){
                    aList.push(homeIdNamePairs[x]);
                    //console.log(homeList);
                }
            }
        }


        listCard = 
            <List sx={{ width: '90%', left: '5%'}}>
            {
                aList.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;

            // if(store.filteredPairs !== undefined){
            
            if(store.searchActive === true){
                console.log("filtered pairs...")
                console.log(store.filteredPairs);
                listCard = 
                <List sx={{ width: '90%', left: '5%'}}>
                {
                    store.filteredPairs.map((pair) => (
                        <ListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                        />
                    ))
                }
                </List>;
                
                
            }
            else if(store.sortActive === true){
                console.log("sorted pairs...")
                console.log(store.sortedLists);
                listCard = 
                <List sx={{ width: '90%', left: '5%'}}>
                {
                    store.sortedLists.map((pair) => (
                        <ListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                        />
                    ))
                }
                </List>;
                
                
            }
            else{
                listCard = 
            <List sx={{ width: '90%', left: '5%'}}>
            {
                aList.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
            }
            

            


            console.log("Boolean value of searchActive from store");
            console.log(store.searchActive);
    }


    return (
        <div id="top5-list-selector">
            <div id="list-selector-heading">
            <ToolBar />

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
            </div>
        </div>)
}

export default AllListsView;
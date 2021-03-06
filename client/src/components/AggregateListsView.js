import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ToolBar from './ToolBar';
import List from '@mui/material/List';
import ListCard from './ListCard.js'
import AggregateListCard from './AggregateListCard';
import AuthContext from '../auth';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const AggregateListsView = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
      
    useEffect(() => {
        console.log("switched to all lists view")
        store.loadAggregateLists();
        
        //store.loadIdNamePairs();
        //store.loadAggregateLists();
    }, []);


    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%'}}>
            {
                store.aggregateLists.map((element) => (
                    <AggregateListCard
                        key={element._id}
                        list={element}
                        selected={false}
                    />
                ))
            }
            </List>;
        if(store.searchActive === true){
            console.log("filtered pairs...")
            console.log(store.filteredPairs);
            listCard = 
            <List sx={{ width: '90%', left: '5%'}}>
            {
                store.filteredPairs.map((element) => (
                    <AggregateListCard
                        key={element._id}
                        list={element}
                        selected={false}
                    />
                ))
            }
            </List>;
            // listCard = 
            // <List sx={{ width: '90%', left: '5%'}}>
            // {
            //     store.filteredPairs.map((pair) => (
            //         <ListCard
            //             key={pair._id}
            //             idNamePair={pair}
            //             selected={false}
            //         />
            //     ))
            // }
            // </List>;
            
            
            
        }
        else if(store.sortActive === true){
            console.log("sorted pairs...")
            console.log(store.sortedLists);
            listCard = 
            <List sx={{ width: '90%', left: '5%'}}>
            {
                store.sortedLists.map((element) => (
                    <AggregateListCard
                        key={element._id}
                        list={element}
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
                store.aggregateLists.map((element) => (
                    <AggregateListCard
                        key={element._id}
                        list={element}
                        selected={false}
                    />
                ))
            }
            </List>;
        }

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

export default AggregateListsView;
import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from '../api'
import MoveItem_Transaction from '../transactions/MoveItem_Transaction'
import UpdateItem_Transaction from '../transactions/UpdateItem_Transaction'
import AuthContext from '../auth'
import { formLabelClasses } from '@mui/material'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    SET_FILTERED_LIST: "SET_FILTERED_LIST",
    SET_FILTERED_LIST_TO_NULL: "SET_FILTERED_LIST_TO_NULL",
    SET_ALL_LISTS: "SET_ALL_LISTS",
    SET_AGGREGATE_LISTS: "SET_AGGREGATE_LISTS",
    SET_SORTED_LISTS: "SET_SORTED_LISTS"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        filteredPairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        itemActive: false,
        listMarkedForDeletion: null,
        searchActive: false,
        allLists: [],
        aggregateLists: [],
        sortedLists: [],
        sortActive: false
        //allLists: []
        //userLists: []
        //
    });
    const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    filteredPairs: null,
                    currentList: payload.top5List,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    searchActive: false,
                    allLists: store.allLists,
                    aggregateLists: store.aggregateLists,
                    sortedLists: store.sortedLists,
                    sortActive: false
                });
            }
            case GlobalStoreActionType.SET_FILTERED_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    filteredPairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    searchActive: true,
                    allLists: store.allLists,
                    aggregateLists: store.aggregateLists,
                    sortedLists: store.sortedLists,
                    sortActive: false
                });
            }

            case GlobalStoreActionType.SET_FILTERED_LIST_TO_NULL: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    filteredPairs: null,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    searchActive: false,
                    allLists: store.allLists,
                    aggregateLists: store.aggregateLists,
                    sortedLists: store.sortedLists,
                    sortActive: false
                });
            }

            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    filteredPairs: null,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    searchActive: false,
                    allLists: store.allLists,
                    aggregateLists: store.aggregateLists,
                    sortedLists: store.sortedLists,
                    sortActive: false
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    filteredPairs: null,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    searchActive: false,
                    allLists: store.allLists,
                    aggregateLists: store.aggregateLists,
                    sortedLists: store.sortedLists,
                    sortActive: false
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    filteredPairs: null,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    searchActive: false,
                    allLists: payload.allLists,
                    aggregateLists: store.aggregateLists,
                    sortedLists: store.sortedLists,
                    sortActive: false
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    filteredPairs: null,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: payload,
                    searchActive: false,
                    allLists: store.allLists,
                    aggregateLists: store.aggregateLists,
                    sortedLists: store.sortedLists,
                    sortActive: false
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    filteredPairs: null,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    searchActive: false,
                    allLists: store.allLists,
                    aggregateLists: store.aggregateLists,
                    sortedLists: store.sortedLists,
                    sortActive: false
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    filteredPairs: store.filteredPairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    searchActive: store.searchActive,
                    allLists: store.allLists,
                    aggregateLists: store.aggregateLists,
                    sortedLists: store.sortedLists,
                    sortActive: false
                });
            }
            // START EDITING A LIST ITEM
            case GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    filteredPairs: null,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: true,
                    listMarkedForDeletion: null,
                    searchActive: false,
                    allLists: store.allLists,
                    aggregateLists: store.aggregateLists,
                    sortedLists: store.sortedLists,
                    sortActive: false
                });
            }

            case GlobalStoreActionType.SET_ALL_LISTS: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    filteredPairs: null,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    searchActive: false,
                    allLists: payload,
                    aggregateLists: store.aggregateLists,
                    sortedLists: store.sortedLists,
                    sortActive: false
                });
            }


            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    filteredPairs: null,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: true,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    searchActive: false,
                    allLists: store.allLists,
                    aggregateLists: store.aggregateLists,
                    sortedLists: store.sortedLists,
                    sortActive: false
                });
            }

            case GlobalStoreActionType.SET_AGGREGATE_LISTS: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    filteredPairs: null,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    searchActive: false,
                    allLists: store.allLists,
                    aggregateLists: payload,
                    sortedLists: store.sortedLists,
                    sortActive: false
                });
            }

            case GlobalStoreActionType.SET_SORTED_LISTS: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    filteredPairs: null,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    searchActive: false,
                    allLists: store.allLists,
                    aggregateLists: store.aggregateLists,
                    sortedLists: payload,
                    sortActive: true
                });
            }

            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = async function (id, newName) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            //this is where we need to check that the list names don't
            //overlap for a user
            if(newName!==""){
                top5List.name = newName;
            }
            //top5List.name = newName;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    async function getListPairs(top5List) {
                        
                        let listWithEmails = await store.getAllLists().then((e) => {
                            return e
                        });
                        console.log(listWithEmails);
                        response = await api.getTop5ListPairs();
                        if (response.data.success) {
                            let pairsArray = response.data.idNamePairs;
                            //let tempArray = pairsArray;
                            let tempArray = [];//pairsArray;
                            if(listWithEmails){
                                for(let x = 0; x < pairsArray.length; x++){
                                    //if(tempArray[x]._id === listWithEmails[x]._id){
                                        //console.log("id matches");
                                    if(listWithEmails[x].ownerEmail === auth.user.email){
                                        //console.log("email matches!");
                                        tempArray.push(pairsArray[x]);
                                    }
                                    else{
                                        console.log("removing non user lists");
                                        //tempArray.splice(x, 1);
                                    }
                                    //}
                                }
                            }
                            console.log(tempArray);
                            //pairsArray = tempArray;
                            storeReducer({
                                type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                payload: {
                                    idNamePairs: pairsArray,
                                    top5List: top5List
                                }
                            });
                        }
                    }
                    getListPairs(top5List);
                }
            }
            updateList(top5List);
        }
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        
        tps.clearAllTransactions();
        history.push("/");
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        console.log(newListName);
        console.log(auth.user.email);
        console.log(auth.user.userName);
        let payload = {
            name: newListName,
            items: ["", "", "", "", ""],
            ownerEmail: auth.user.email,
            userName: auth.user.userName,
            published: false,
            likes: [],
            dislike: [],
            views: 0,
            comments: [{}]

        };
        const response = await api.createTop5List(payload);
        if (response.data.success) {
            tps.clearAllTransactions();
            let newList = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            history.push("/top5list/" + newList._id);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = async function () {

        // console.log(auth.user.email);
        // console.log(auth.user.userName);
        let listWithEmails = await store.getAllLists().then((e) => {
            return e
        });
        

        //        store.loadAggregateLists();
        // console.log(listWithEmails);
        // console.log("looking at allLists")
        // console.log(store.allLists);

        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            //console.log(response.data);
            let pairsArray = response.data.idNamePairs;
            console.log(pairsArray);
            let tempArray = [];//pairsArray;
            if(listWithEmails){
                for(let x = 0; x < pairsArray.length; x++){
                    //if(tempArray[x]._id === listWithEmails[x]._id){
                        //console.log("id matches");
                    if(listWithEmails[x].ownerEmail === auth.user.email){
                        //console.log("email matches!");
                        tempArray.push(pairsArray[x]);
                    }
                    else{
                        console.log("removing non user lists");
                        //tempArray.splice(x, 1);
                    }
                    //}
                }
            }
            console.log(tempArray);
            //pairsArray = tempArray;
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                //payload: pairsArray
                payload: {
                    idNamePairs: pairsArray,
                    allLists: listWithEmails
                }
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    store.getAllLists = async function () {
        //getAllTop5Lists
        const response = await api.getAllTop5Lists();
        if (response.data.success) {
            let allLists = response.data.data;
            // console.log("in store");
            // console.log(allLists);
            // storeReducer({
            //     type: GlobalStoreActionType.SET_ALL_LISTS,
            //     payload: allLists
            // });
            
            return allLists;
        }
        else {
            console.log("API FAILED TO GET THE LISTs");
        }

        //store.getLists()
    }



    //when we sort lists, we'll have to update id names pairs too...
    //we can use a store reducer for that


    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = async function (id) {
        // GET THE LIST
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
        store.showDeleteListModal();
    }

    store.showDeleteListModal = function() {
        let modal = document.getElementById("delete-modal");
        modal.classList.add("is-visible");
    }
    store.hideDeleteListModal = function() {
        let modal = document.getElementById("delete-modal");
        modal.classList.remove("is-visible");
    }

    store.deleteList = async function (listToDelete) {
        //store.deleteAggregateVotes(listToDelete);
        let response = await api.deleteTop5ListById(listToDelete._id);
        if (response.data.success) {
            //when a list is deleted, its votes must be removed from the 
            //corresponding aggregate list

            store.loadIdNamePairs();
            history.push("/");
        }

    }

    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion);
        store.hideDeleteListModal();
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    store.showErrorModal = function() {
        let modal = document.getElementById("error-modal");
        modal.classList.add("is-visible");
    }
    store.hideErrorModal = function() {
        let modal = document.getElementById("error-modal");
        modal.classList.remove("is-visible");
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;

            response = await api.updateTop5ListById(top5List._id, top5List);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: top5List
                });
                //history.push("/top5list/" + top5List._id);
            }
        }
    }



    store.addMoveItemTransaction = function (start, end) {
        let transaction = new MoveItem_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }

    store.addUpdateItemTransaction = function (index, newText) {
        let oldText = store.currentList.items[index];
        let transaction = new UpdateItem_Transaction(store, index, oldText, newText);
        tps.addTransaction(transaction);
    }

    store.moveItem = function (start, end) {
        start -= 1;
        end -= 1;
        if (start < end) {
            let temp = store.currentList.items[start];
            for (let i = start; i < end; i++) {
                store.currentList.items[i] = store.currentList.items[i + 1];
            }
            store.currentList.items[end] = temp;
        }
        else if (start > end) {
            let temp = store.currentList.items[start];
            for (let i = start; i > end; i--) {
                store.currentList.items[i] = store.currentList.items[i - 1];
            }
            store.currentList.items[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        //store.updateToolbarButtons();
        store.updateCurrentList();
    }

    store.updateItem = function (index, newItem) {
        store.currentList.items[index] = newItem;
        //store.updateToolbarButtons();
        store.updateCurrentList();
    }
    store.updateViews = function (list) {
        let x = list.views
        list.views = x+1;
        //store.updateToolbarButtons();
        store.updateListById(list._id, list);

    }

    store.updateName = function (list, name) {
        list.name = name;
        //store.updateToolbarButtons();
        store.updateListById(list._id, list);

    }

    store.addComment = function (comment) {
        let newComment = {"userName": auth.user.userName, "comment": comment}
        store.currentList.comments.push(newComment);
        //console.log(store.currentList);
        store.updateCurrentList();
    }


    store.updateCurrentList = async function () {
        const response = await api.updateTop5ListById(store.currentList._id, store.currentList);
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: store.currentList
            });
        }
        //store.updateToolbarButtons();
    }

    store.updateItems = function (itemsArray) {
        store.currentList.items = itemsArray;
        //console.log(store.currentList.views);
        //store.updateToolbarButtons();
        store.updateCurrentList();
    }

    store.updateLikes = function (list) {
        let uName = auth.user.userName;
        if(list.likes.includes(uName)){
            //do nothing
        }
        else if(list.dislike.includes(uName)){
            let index = list.dislike.indexOf(uName);
            list.dislike.splice(index, 1);
            list.likes.push(uName);
        }
        else{
            list.likes.push(uName);
        }
        store.currentList = list;
        store.updateCurrentList();
        //store.updateListById(list._id, list);
    }

    store.updateDislikes = function (list ) {
        let uName = auth.user.userName;
        if(list.dislike.includes(uName)){
            //do nothing
        }
        else if(list.likes.includes(uName)){
            let index = list.likes.indexOf(uName);
            list.likes.splice(index, 1);
            list.dislike.push(uName);
        }
        else{
            list.dislike.push(uName);
        }
        
        store.currentList = list;
        store.updateCurrentList();

        //store.updateListById(list._id, list);
    }


    store.publishList = async function (list) {
        //store.loadAggregateLists();
        
        let uName = auth.user.userName;
        let publish = true
        store.allLists.forEach(element => {
            if(element.uName === list.uName){
                if(element.name === list.name && element._id !== list._id){
                    console.log("we cant publish this list yet, the names match")
                    publish = false
                }
            }
        });
        if(publish){
            list.published = true;
            console.log(list)

            store.updateListById(list._id, list);

            //aight, so this is where we have to check aggregate lists
            //if an aggregate with this name does not exist --> create it
            //if it does --> tally up the votes and then update that aggregate list
            let a = false;
            console.log(store.aggregateLists);
            if(store.aggregateLists){
                store.aggregateLists.forEach(element => {
                    if(element.name.toLowerCase() === list.name.toLowerCase()){
                        console.log("aggregate name match");
                        //aggregate list exists!
                        store.updateAggregateListItems(list.items, element);
                        a = true
                    }
                });
                if(a===false){
                    //aggregate list does not exist yet
                    //store.createAggregateList(list);
                    store.createAggregateList(list);
                }
            }
            
            history.push("/");


           
        }
    }



    store.updateListById = async function (id, list) {
        console.log(list);
        const response = await api.updateTop5ListById(id, list);
        if (response.data.success) {
            // storeReducer({
            //     type: GlobalStoreActionType.SET_CURRENT_LIST,
            //     payload: store.currentList
            // });
        }
        
    }


    //lets think about sorting
    store.sortList = function () {

    }



    

    //THIS IS GOING TO BE WHERE WE DO AGGREGATE LIST OPERATIONS
    //LOAD, CHECK IF LIST EXISTS, UPDATE ITEM+VOTES, UPDATE BY ID, UPDATE LIKES AND DISLIKES
    //UPDATE VIEWS, UPDATE COMMENTS
    store.loadAggregateLists = async function () {
        //const response = await api.getAllTop5Lists();
        const response = await api.getAggregateLists();
        if (response.data.success) {
            //console.log(response.data.data);
            let responseList = response.data.data;
            storeReducer({
                type: GlobalStoreActionType.SET_AGGREGATE_LISTS,
                payload: responseList
            });
        }
        console.log(store.aggregateLists)
    }

    store.checkAggregateListExists = function(list){
        let existingList = [];
        store.aggregateLists.forEach(element => {
            if(element.name === list.name){
                //match
                existingList = element;
            }
            else{
                //does not exist in aggregate list database
            }
        });
        return existingList;
    }

    store.updateAggregateListItems = function(items, aggregateList){
        let pointIndex = [5, 4, 3, 2, 1];
        let itemsArray = aggregateList.items;
        let aggregateKeys = []
        for(let i = 0; i < itemsArray.length; i++){
            aggregateKeys.push(itemsArray[i].item)
        }
        //okay, now we have the aggregate keys
        for(let x = 0; x < items.length; x++){
            if(aggregateKeys.includes(items[x])){
                let index = aggregateKeys.indexOf(items[x]);
                itemsArray[index].vote = itemsArray[index].vote + pointIndex[x]
            }
            else{
                let o = { item: items[x], vote: pointIndex[x]}
                itemsArray.push(o);
            }
        }
        //console.log(itemsArray);
        aggregateList.items = itemsArray;
        store.updateAggregateList(aggregateList._id, aggregateList);
    }

    store.updateAggregateLikes = function (list) {
        let uName = auth.user.userName;
        if(list.likes.includes(uName)){
            //do noth
        }
        else if(list.dislike.includes(uName)){
            let index = list.dislike.indexOf(uName);
            list.dislike.splice(index, 1);
            list.likes.push(uName);
        }
        else{
            list.likes.push(uName);
        }
        console.log(list);
        store.updateAggregateList(list._id, list);
    }

    store.updateAggregateDislikes = function (list ) {
        let uName = auth.user.userName;
        if(list.dislike.includes(uName)){
            //do nothing
        }
        else if(list.likes.includes(uName)){
            let index = list.likes.indexOf(uName);
            list.likes.splice(index, 1);
            list.dislike.push(uName);
        }
        else{
            list.dislike.push(uName);
        }
        console.log(list);
        store.updateAggregateList(list._id, list);
    }

    store.addAggregateComment = function(comment, list) {
        let newComment = {"userName": auth.user.userName, "comment": comment}
        list.comments.push(newComment);
        //console.log(store.currentList);
        store.updateAggregateList(list._id, list);
    }

    store.updateAggregateViews = function(list) {
        let x = list.views
        list.views = x+1;
        store.updateAggregateList(list._id, list);
    }


    store.deleteAggregateVotes = function(list){
        //this is a normal t5 list!!!!
        let flag = false
        let aList = {}
        store.aggregateLists.forEach(element => {
            if(element.name === list.name){
                //then we have some deleting to do~
                flag = true
                aList = element
            }
        });

        if(flag){
            let pointIndex = [5, 4, 3, 2, 1];
            let itemsArray = aList.items;
            let aggregateKeys = []
            for(let i = 0; i < itemsArray.length; i++){
                aggregateKeys.push(itemsArray[i].item)
            }
            //okay, now we have the aggregate keys
            for(let x = 0; x < list.items.length; x++){
                if(aggregateKeys.includes(list.items[x])){
                    let index = aggregateKeys.indexOf(list.items[x]);
                    itemsArray[index].vote = itemsArray[index].vote - pointIndex[x]
                }
            }
        console.log(itemsArray);
        
        }
    }

    store.updateAggregateList = async function (id, list) {
        const response = await api.updateAggregateList(id, list);
        if (response.data.success) {
            console.log("yay")
            store.loadAggregateLists();
            // storeReducer({
            //     type: GlobalStoreActionType.SET_AGGREGATE_LISTS,
            //     payload: list
            // });
        }
        
    }

    store.createAggregateList = async function(list) {
        //we're receiving a normal, top 5 list!
        let aItems = [];
        let voteCount = 5;
        list.items.forEach(element => {
            let o = { item: element, vote: voteCount}
            aItems.push(o) 
            voteCount = voteCount-1;
        }); 
        
        let payload = {
            name: list.name,
            items: aItems,
            likes: [],
            dislike: [],
            views: 0,
            comments: [{}]

        };
        console.log(payload);

        const response = await api.createAggregateList(payload);
        if (response.data.success) {
            console.log("yay, aggregate list created")
            store.loadAggregateLists();
            // storeReducer({
            //     type: GlobalStoreActionType.SET_AGGREGATE_LISTS,
            //     payload: list
            // });
        }

    }







    store.sortLists = function (sortCase, view) {
        console.log("sorting lists...");
        
        let uName = auth.user.userName;
        let tempArray = []
        let aLists = store.allLists
        let aggLists = store.aggregateLists
        //and alllists is an array of objects
        if(sortCase==="views"){
            aLists.sort((a, b) => (a.views < b.views) ? 1 : -1);
            aggLists.sort((a, b) => (a.views < b.views) ? 1 : -1);
        }
        if(sortCase==="likes"){
            aLists.sort((a, b) => (a.likes.length < b.likes.length) ? 1 : -1);
            aggLists.sort((a, b) => (a.likes.length < b.likes.length) ? 1 : -1);
        }
        if(sortCase==="dislikes"){
            aLists.sort((a, b) => (a.dislike.length < b.dislike.length) ? 1 : -1);
            aggLists.sort((a, b) => (a.dislike.length < b.dislike.length) ? 1 : -1);
        }
        if(sortCase==="publish date (newest)"){
            aLists.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            aggLists.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        }
        if(sortCase==="publish date (oldest)"){
            aLists.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
            aggLists.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
        }

        if(view === "/"){
            //this is the one for the user's own list, published and unpublished
            aLists.forEach(element => {
                if(element.userName === uName){
                    tempArray.push(element)
                }
            });

        }

        if(view==="/alllistsviews/" || view===""){
            // store.idNamePairs.forEach(element => {
            //     if(element.name.toLowerCase() === searchWord.toLowerCase()){
            //         console.log("we hit the search key")
            //         tempArray.push(element);
            //     }
            // });
            //tempArray = aLists;
            aLists.forEach(element => {
                if(element.published === true){
                    tempArray.push(element)
                }
            });

        }
        if(view==="/userlistview/"){
            // store.allLists.forEach(element => {
            //     if(element.userName.toLowerCase() === searchWord.toLowerCase()){
            //         console.log("we hit the search key (username)")
            //         tempArray.push(element);
            //     }
            // });
            if(store.searchActive){
                let fLists = store.filteredPairs;
                console.log(fLists);
                console.log(aLists);
                let nameKeys = []
                fLists.forEach(element => {
                    nameKeys.push(element.name)
                });
                console.log(nameKeys);
                for(let x = 0; x < aLists.length; x++){
                    if(nameKeys.includes(aLists[x].name)){
                        tempArray.push(aLists[x])
                    }
                }

                // aLists.forEach(element => {
                //     if(element.userName === uName && element.published===true){
                //         tempArray.push(element)
                //     }
                // });
            }
        }

        if(view==="/aggregatelistsview/"){
            // store.allLists.forEach(element => {
            //     if(element.userName.toLowerCase() === searchWord.toLowerCase()){
            //         console.log("we hit the search key (username)")
            //         tempArray.push(element);
            //     }
            // });
            tempArray = aggLists;
            
        }
        
        console.log(tempArray)
        let payload = []
        if(view==="/aggregatelistsview/"){
            //then we set the id name pairs differently
            payload = tempArray;
        }
        else{
            //so, at this point, if any element of idname pairs matches a name in 
            //temparray, add it

            //no, because we have a sorted list, we're just transforming it into id-name pairs
            tempArray.forEach(element => {
                let o = {_id: element._id, name: element.name}
                payload.push(o);
            });

            // let payload = []
            // let keyArray = []
            // for(let i = 0; i < tempArray.length; i++){
            //     keyArray.push(tempArray[i].name)
            // }
            // store.idNamePairs.forEach(element => {
            //     if(keyArray.contains(element.name)){
            //         payload.push(element)
            //     }
            // });

        }
        storeReducer({
            type: GlobalStoreActionType.SET_SORTED_LISTS,
            payload: payload
        });

    }

    store.setSortedListToNull = function() {
        storeReducer({
            type: GlobalStoreActionType.SET_SORTED_LISTS,
            payload: []
        });
    }


    store.searchLists = function (searchWord, view) {
        //store.setSortedListToNull();
        console.log("filtering lists...");
        console.log(searchWord);
        console.log(store.idNamePairs);
        let uName = auth.user.userName
        let tempArray = []
        if(view==="/"){
            console.log("here we are");
            store.idNamePairs.forEach(element => {
                if(element.name.toLowerCase() === searchWord.toLowerCase()){
                    console.log("we hit the search key")
                    tempArray.push(element);
                }
            });
        }

        if(view==="/alllistsviews/" || view===""){
            store.idNamePairs.forEach(element => {
                if(element.name.toLowerCase() === searchWord.toLowerCase()){
                    console.log("we hit the search key")
                    tempArray.push(element);
                }
            });
        }
        if(view==="/userlistview/"){
            store.allLists.forEach(element => {
                if(element.userName.toLowerCase() === searchWord.toLowerCase()){
                    console.log("we hit the search key (username)")
                    if(element.published === true){
                        tempArray.push(element);
                    }
                    
                }
            });
        }
        if(view==="/aggregatelistsview/"){
            store.aggregateLists.forEach(element => {
                if(element.name.toLowerCase() === searchWord.toLowerCase()){
                    tempArray.push(element);  
                }
            });
        }
        
        //console.log(tempArray)
        storeReducer({
            type: GlobalStoreActionType.SET_FILTERED_LIST,
            payload: tempArray
        });

    }

    store.setFilteredPairsToNull = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_FILTERED_LIST_TO_NULL,
            payload: []
        });
    }






    store.undo = function () {
        tps.undoTransaction();
        //store.updateToolbarButtons();
    }

    store.redo = function () {
        tps.doTransaction();
        //store.updateToolbarButtons();
    }

    store.canUndo = function() {
        return tps.hasTransactionToUndo();
    }

    store.canRedo = function() {
        return tps.hasTransactionToRedo();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
    store.setIsItemEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE,
            payload: null
        });
    }

    store.disableButton = (id) => {
        let button = document.getElementById(id);
        button.classList.add("top5-button-disabled");

    }

    store.enableButton = (id) => {
        let button = document.getElementById(id);
        button.classList.remove("top5-button-disabled");
    }

    store.updateToolbarButtons = () => {
        console.log("updating buttons...");
        if (!tps.hasTransactionToUndo()) {
            store.disableButton("undo-button");
        }
        else {
            store.enableButton("undo-button");
        }

        if (!tps.hasTransactionToRedo()) {
            store.disableButton("redo-button");
        }
        else {
            console.log("updating...");
            store.enableButton("redo-button");
        }
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };
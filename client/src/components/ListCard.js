import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from "@mui/material/Paper";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from "@material-ui/core/Collapse";
import Top5ItemBox from "./Top5ItemBox"
import { Link } from 'react-router-dom'
import Grid from "@mui/material/Grid";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { styled } from "@mui/material/styles";
import  CommentBox  from './CommentBox';
import Button from "@mui/material/Button";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";


/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/

function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [expand, setExpanded] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair } = props;
    

    let userName = ""
    let views = 0
    let numLikes = 0
    let numDislikes = 0
    let thisList = {}
    let published = false;
    let date = ""
    let comments = {}
    
    if(store){
        //we're going to get all the info from all the lists for this view
        store.allLists.forEach(element => {
            if(element._id === idNamePair._id){
                // console.log("we found a match!");
                // console.log(element)
                userName = element.userName;
                views = element.views;
                numLikes = element.likes.length;
                numDislikes = element.dislike.length;
                thisList = element;
                published = element.published;
                comments = element.comments;
                date = element.updatedAt;
               // console.log(date);
                var months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'Sept', 'Oct', 'Nov', 'Dec'];
                var now = new Date(date);
                date = months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear();

            }
        });
    }

    let icon = (
        <IconButton
          onClick={(event) => {
            handleExpandClick(event, idNamePair._id);
          }}
        >
          <ExpandMoreIcon style={{ fontSize: "20pt" }} />
        </IconButton>
      );
      if (expand === true) {
        icon = (
          <IconButton
            onClick={(event) => {
              handleUnexpandClick(event);
            }}
          >
            <ExpandLessIcon style={{ fontSize: "20pt" }} />
          </IconButton>
        );
      }
    //we can...use id name pairs to filter lists, and render them

    //OKAY
    //I HAVE ALL THE LISTS W ME IN ALLLISTS
    //SO NOW IF I MATCH UP THE IDNAMEPAIR FROM PROPS TO THE LIST, 
    //I'LL BE ABLE TO FILL IN DATA
    //HELL YEAH

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    function handleEditClicked(){
        //console.log("we should be setting the list here");
        //store.setCurrentList(id);
        console.log(idNamePair._id);
        //store.setCurrentListWithHistory
        //store.setCurrentListWithHistory(idNamePair._id);
    }

    function likeButtonClicked(){
        //what is the logic of the like button?
        //the same user can't like something twice
        //and if they like something, and they are in the dislike list, they must be removed
        console.log("like button pressed!")
        console.log(thisList);
        store.updateLikes(thisList);

    }

    function dislikeButtonClicked(){
        //therefore, if they dislike something and they're in the like list, they must be removed
        store.updateDislikes(thisList);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
        console.log("handling delete...");
        //let modal = document.getElementById("delete-modal");
        //modal.classList.add("is-visible");
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    //time for CONDITIONAL RENDERING BITCHES
    const handleExpandClick = (event, id) => {
        store.setCurrentList(id); //problem with doing it this way! - cant open multiple lists!
        let newExpanded = !expand
        setExpanded(newExpanded);
        // console.log(store.currentList);
        // console.log(store.allLists);

        // if(store.currentList){
        //     let tempList = store.currentList
        //     tempList.views = tempList.views+1;
        //     console.log(tempList);
        //     store.updateListById(id, tempList);
        // }
        

    };

    const handleUnexpandClick = (event) => {
        //store.setCurrentList(id); //problem with doing it this way! - cant open multiple lists!
        if(thisList.published === true){
            store.updateViews(thisList);
        }
        
        let newExpanded = !expand;
        setExpanded(newExpanded);
        // if(store.currentList){
        //     store.updateViews();
        // }
      };

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary
      }));
    
    let items = []
    if(store.currentList){
        items = store.currentList.items;
    }
    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            button
            onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }
            }
            style={{
                fontSize: '48pt',
                width: '100%'
            }}
        >
                <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={handleToggleEdit} aria-label='edit'>
                        <EditIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                </Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        <DeleteIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                </Box>
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Top 5 List Name"
                name="name"
                autoComplete="Top 5 List Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }

    cardElement = 
    <Box className="list-card-test">
    <Paper elevation={0} sx={{ width: "100%",
    height: "100%", margin: 2, padding: 3, fontSize:'36pt', bgcolor: "#fffff0", border: "solid 1px" }}>
        {idNamePair.name}
        <Box sx={{ p: 1,flexGrow: 1 }}>
        <IconButton onClick={(event) => {
                        // handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        <DeleteIcon style={{fontSize:'30pt'}} />
        </IconButton>
        <Link to={'/top5list/'+idNamePair._id} onClick={handleEditClicked}>Edit</Link>
        <IconButton onClick={(event) => {
                        handleExpandClick(event, idNamePair._id)
                    }} aria-label='expand'>
                        <ExpandMoreIcon style={{fontSize:'30pt'}} />
        </IconButton>
        </Box>
    <Collapse in={expand} timeout="auto" unmountOnExit sx={{ width: "100%", height: "100%", marginTop:0, paddingTop:0, borderCollapse:"collapse" }} >
        {/* <Paper disableSpacing elevation={0} sx={{height: "100px", width: "100%", bgcolor: "#fffff0" }}>
        </Paper> */}
        <ListItem sx={{width: "100%", height: "100%", bgcolor: "#fffff0", margin: 2, padding: 3}}> <Top5ItemBox items={items} /> </ListItem>
        {/* hello */}
    </Collapse>
        
    </Paper>
    
    </Box>

    let editItem = <Item sx={{ bgcolor: "#fffff0", boxShadow: "none", fontSize:"16pt", marginRight:"100px" }}>
    <Link to={'/top5list/'+idNamePair._id} onClick={handleEditClicked} >Edit</Link>
    </Item>
    let commentBox = "";

    let color = "#fffff0"
    if(published===true){
        color = "#d4d3f8";
        editItem = <Item sx={{ bgcolor: color, boxShadow: "none", fontSize:"16pt", marginLeft:"50px" }}>
        Published: {date}
        </Item>
        commentBox = <CommentBox color={color}/>
        
    }


    cardElement =
    <Box sx={{ flexGrow: 1 }}>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          height: "100%",
          margin: 2,
          padding: 3,
          fontSize: "36pt",
          bgcolor: color,
          border: "solid 1px"
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Item
              sx={{ bgcolor: color, boxShadow: "none", fontWeight: "bold", fontSize: "24pt" }}
            >
              {idNamePair.name} <h style={{fontSize: "16pt"}}> by {userName}</h>
              {/* <Button onClick={buttonClicked(idNamePair._id)}></Button> */}
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item sx={{ bgcolor: color, boxShadow: "none" }}></Item>
          </Grid>
          <Grid item xs={1}>
            <Item sx={{ bgcolor: color, boxShadow: "none" }}>
              <IconButton>
                <ThumbUpIcon style={{ fontSize: "40pt" }} onClick={likeButtonClicked} />
                {numLikes}
              </IconButton>
            </Item>
          </Grid>
          <Grid item xs={1}>
            <Item sx={{ bgcolor: color, boxShadow: "none" }}>
              <IconButton>
                <ThumbDownIcon style={{ fontSize: "40pt" }}  onClick={dislikeButtonClicked}/>
                {numDislikes}
              </IconButton>
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item sx={{ bgcolor: color, boxShadow: "none" }}>
              <IconButton>
                <DeleteIcon style={{ fontSize: "40pt" }} onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }}/>
              </IconButton>
            </Item>
          </Grid>

          <Grid item xs={2}>
            {editItem}
          </Grid>
          <Grid item xs={6}>
            <Item sx={{ bgcolor: color, boxShadow: "none" }}></Item>
          </Grid>
          <Grid item xs={2}>
            <Item sx={{ bgcolor: color, boxShadow: "none", fontSize:"20pt" }}>
              Views: {views}
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item sx={{ bgcolor: color, boxShadow: "none" }}>
              {icon}
            </Item>
          </Grid>
        </Grid>
        <Collapse in={expand} timeout="auto" unmountOnExit sx={{ width: "100%", height: "100%", marginTop:0, paddingTop:0, borderCollapse:"collapse" }} >
        {/* <Paper disableSpacing elevation={0} sx={{height: "100px", width: "100%", bgcolor: "#fffff0" }}>
        </Paper> */}
        <Grid container spacing={0}>
        <Grid item xs={6}>
            <ListItem sx={{width: "1500px", height: "100%", bgcolor: "transparent", margin: 2, padding: 3}}> <Top5ItemBox items={items} /> </ListItem>
        </Grid>
        <Grid item xs={6}>
        <List sx={{
        width: '100%',
        maxWidth: 1000,
        bgcolor: color,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 500,
        marginTop: "40px",
        '& ul': { padding: 0 },
      }}>
        <ListItem> {commentBox} </ListItem>
        </List>
        </Grid>
        </Grid>
        {/* hello */}
        </Collapse>
      </Paper>
    </Box>
    
    
    return (
        cardElement
    );
}

export default ListCard;
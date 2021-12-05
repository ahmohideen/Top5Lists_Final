import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
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

function AggregateListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [expand, setExpanded] = useState(false);
    const [text, setText] = useState("");
    const { list } = props;
    
    let id = ""
    let listName = ""
    let updateDate = ""
    let views = 0
    let numLikes = 0
    let numDislikes = 0
    let thisList = {}
    let date = ""
    let items = []
    let itemVotes = []
    if(store){
        //we're going to get all the info from all the lists for this view
        // store.allLists.forEach(element => {
        //     if(element._id === idNamePair._id){
        //         // console.log("we found a match!");
        //         // console.log(element)
        //         userName = element.userName;
        //         views = element.views;
        //         numLikes = element.likes.length;
        //         numDislikes = element.dislike.length;
        //         thisList = element;
        //     }
        // });
        id = list._id;
        listName = list.name;
        views = list.views;
        numLikes = list.likes.length;
        numDislikes = list.dislike.length;
        date = list.updatedAt;
        console.log(date);
        var months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'Sept', 'Oct', 'Nov', 'Dec'];
        var now = new Date(date);
        date = months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear();

        // items = list.items.keys()
        // itemVotes = list.items.values()

    }

    let icon = (
        <IconButton
          onClick={(event) => {
            handleExpandClick(event, id);
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



    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }



    function likeButtonClicked(){
        //what is the logic of the like button?
        //the same user can't like something twice
        //and if they like something, and they are in the dislike list, they must be removed
        console.log("like button pressed!")
        //store.updateLikes(thisList);
        store.updateAggregateLikes(list);

    }

    function dislikeButtonClicked(){
        //therefore, if they dislike something and they're in the like list, they must be removed
        //store.updateDislikes(thisList);
        store.updateAggregateDislikes(list);
    }


    //time for CONDITIONAL RENDERING BITCHES
    const handleExpandClick = (event, id) => {
       // store.setCurrentList(id); //problem with doing it this way! - cant open multiple lists!
        let newExpanded = !expand
        setExpanded(newExpanded);
    };

    const handleUnexpandClick = (event) => {
        //store.setCurrentList(id); //problem with doing it this way! - cant open multiple lists!
        //store.updateViews(thisList);
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
    
    
    let cardElement = ""
     

    



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
          bgcolor: "#d4d3f8",
          border: "solid 1px"
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Item
              sx={{ bgcolor: "#d4d3f8", boxShadow: "none", fontWeight: "bold", fontSize: "24pt" }}
            >
              {listName}
              {/* <Button onClick={buttonClicked(idNamePair._id)}></Button> */}
            </Item>
          </Grid>
          <Grid item xs={7}>
            <Item sx={{ bgcolor: "#d4d3f8", boxShadow: "none" }}></Item>
          </Grid>
          <Grid item xs={2}>
            <Item sx={{ bgcolor: "#d4d3f8", boxShadow: "none" }}>
              <IconButton>
                <ThumbUpIcon style={{ fontSize: "40pt" }} onClick={likeButtonClicked} />
                {numLikes}
              </IconButton>
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item sx={{ bgcolor: "#d4d3f8", boxShadow: "none" }}>
              <IconButton>
                <ThumbDownIcon style={{ fontSize: "40pt" }}  onClick={dislikeButtonClicked}/>
                {numDislikes}
              </IconButton>
            </Item>
          </Grid>
          {/* <Grid item xs={0}>
            <Item sx={{ bgcolor: "#fffff0", boxShadow: "none" }}>
            </Item>
          </Grid> */}

          <Grid item xs={3}>
            <Item sx={{ bgcolor: "#d4d3f8", boxShadow: "none", fontSize:"20pt", marginRight:"190px" }}>
                Updated: {date}
            </Item>
          </Grid>
          <Grid item xs={5}>
            <Item sx={{ bgcolor: "#d4d3f8", boxShadow: "none" }}></Item>
          </Grid>
          <Grid item xs={2}>
            <Item sx={{ bgcolor: "#d4d3f8", boxShadow: "none", fontSize:"20pt" }}>
              Views: {views}
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item sx={{ bgcolor: "#d4d3f8", boxShadow: "none" }}>
              {icon}
            </Item>
          </Grid>
        </Grid>
        <Collapse in={expand} timeout="auto" unmountOnExit sx={{ width: "100%", height: "100%", marginTop:0, paddingTop:0, borderCollapse:"collapse" }} >
        {/* <Paper disableSpacing elevation={0} sx={{height: "100px", width: "100%", bgcolor: "#fffff0" }}>
        </Paper> */}
        <Grid container spacing={2}>
        <Grid item >
            <ListItem sx={{width: "1500px", height: "100%", bgcolor: "#d4d3f8", margin: 2, padding: 3}}> <Top5ItemBox items={items} votes={itemVotes} /> </ListItem>
        </Grid>
        <Grid item >
            {/* <CommentBox ></CommentBox> */}
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

export default AggregateListCard;
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FunctionsIcon from '@mui/icons-material/Functions';
import { Link } from 'react-router-dom'
import { GlobalStoreContext } from '../store'
import { useContext, useState } from "react";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
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

export default function PrimarySearchAppBar() {
  //const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { store } = useContext(GlobalStoreContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleAllViewsRoute = (event) => {

  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEnterKeyPressed = (event) => {
    
    if(event.keyCode == 13){
      console.log("enter pressed...")
      console.log('value ', event.target.value);
      let wId = window.location.href.split('3000')[1];
      //console.log(wId);
      if(event.target.value===""){
        store.setFilteredPairsToNull();
        console.log(store.idNamePairs);
        console.log(store.filteredPairs);
      }
      else{
      store.searchLists(event.target.value, wId);
      console.log(store.filteredPairs);
      }
      
   }
  }


  const handleSort = (event) => {
    let wId = window.location.href.split('3000')[1];
    console.log(wId);
    console.log(event.target.innerText);
    let sortKey = event.target.innerText.toLowerCase()
    store.sortLists(sortKey, wId);
  }

  //search is going to call a store method, which can in turn re render lists. 
  //do we need to know which view we're on? not really, right?
  //as long as the store method just changes all of them we'll be fine


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, height: '225px'}}>
      <AppBar position="static" elevation={0} sx={{ flexGrow: 1, height: '100px', bgcolor: 'rgb(196, 196, 196)'}} > 
      <Toolbar >
        <Box sx={{ display: { xs: 'none', md: 'flex', color: 'black' } }}>
        
        <Link to='/' style={{ textDecoration: 'none', color: "black" }}>
        <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <HomeIcon 
              sx={{ fontSize: '75px'}}
              />
            </IconButton>
          </Link>

            <Link to='/alllistsviews/' style={{ textDecoration: 'none', color: "black" }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              
            >
              <GroupsIcon sx={{ fontSize: '75px'}}/>
            </IconButton>
            </Link>

            <Link to='/userlistview/' style={{ textDecoration: 'none', color: "black" }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <PersonOutlineIcon sx={{ fontSize: '75px'}}/>
            </IconButton>
            </Link>

            <Link to='/aggregatelistsview/' style={{ textDecoration: 'none', color: "black" }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <FunctionsIcon sx={{ fontSize: '75px'}}/>
            </IconButton>
            </Link>
            


          </Box>

          <Search sx={{ minWidth: '500px', color: 'black' }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onKeyDown={handleEnterKeyPressed}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Typography
                // variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block', color: 'black', fontsize:"30pt"  } }}
            >
                Sort By
            </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex', color: 'black'  } }}>
          
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={handleClick}
            >
                <MenuIcon sx={{ fontSize: '75px'}}/>
            </IconButton>
            <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleSort}>Publish Date (newest)</MenuItem>
            <MenuItem onClick={handleSort}>Publish Date (oldest)</MenuItem>
            <MenuItem onClick={handleSort}>Views</MenuItem>
            <MenuItem onClick={handleSort}>Likes</MenuItem>
            <MenuItem onClick={handleSort}>Dislikes</MenuItem>
          </Menu>
          </Box>
          
          
        </Toolbar>
      </AppBar>
      
    </Box>
  );
}

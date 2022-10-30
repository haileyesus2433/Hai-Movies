import React, { useState, useEffect, useContext } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Brightness4, Brightness7, Menu, AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { colorModeContext } from '../../utils/ChangeMode';
import { SideBar, Search } from '../index';
import { fetchToken, getSessionId, moviesApi } from '../../utils/fetchToken';
import { setUserData, userSelector } from '../../features/auth';
import useStyles from './styles';

const NavBar = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(userSelector);
  const [mobileOpen, setMobileOpen] = useState(false);

  const colorMode = useContext(colorModeContext);

  const token = localStorage.getItem('token');
  const sessionIdLocal = localStorage.getItem('sessionId');
  console.log(user);
  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdLocal) {
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdLocal}`);
          dispatch(setUserData(userData));
        } else {
          const sessionId = await getSessionId();
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
          dispatch(setUserData(userData));
        }
      }
    };
    logInUser();
  }, [token]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            style={{ outline: 'none' }}
            edge="start"
            onClick={() => { setMobileOpen((prevMobileOpen) => !prevMobileOpen); }}
            className={classes.menuButton}
          >
            {isMobile && <Menu color="inherit" />}
          </IconButton>
          <IconButton
            color="inherit"
            onClick={colorMode.changeMode}
            sx={{ ml: 1 }}
          >
            {theme.palette.mode === 'dark' ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button
                color="inherit"
                onClick={fetchToken}
              >
                LogIn &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                onClick={() => {}}
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
              >
                {!isMobile && <>My Movies</>}
                <Avatar
                  style={{ width: '30px', height: '30px', margin: '10px' }}
                  alt="Profile Avatar"
                  src={`https://themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`}
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => { setMobileOpen((prevMobileOpen) => !prevMobileOpen); }}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{ keepMounted: true }}
            >
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;


import { NavLink, useNavigate } from "react-router-dom"
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Stack, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from "react";
import AccountCircle from '@mui/icons-material/AccountCircle';
import useFetchData from "../hooks/useFetchData";
import config from "../config";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function Navigation({role, userId}) {
    const [value, setValue] = useState(0)
    const [anchorEl, setAnchorEl] = useState(null);

    const redirect = useNavigate()

    const {data: userData} = useFetchData(role === 'user' ? `${config.API_URL}/students?userId=${userId}` : `${config.API_URL}/teachers?userId=${userId}`)

    const handleLogOut = () => {
        localStorage.setItem('loggedIn', JSON.stringify(false))
        redirect('/')
        window.location.reload(true)
    }
    
    const handleTabs = (_, newValue) => {
        setValue(newValue);
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }
    

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Tabs sx={{ mr: 4 }} value={value} onChange={handleTabs} textColor='inherit'>
              {role === 'administrative' && (
                <Tab label={
                  <IconButton color='inherit' aria-label='settings'>
                    <SettingsIcon/>
                  </IconButton>
                } component={NavLink} to='settings'/>
              )}
              <Tab label='students' component={NavLink} to='/'/>
              <Tab label='groups' component={NavLink} to='groups'/>
              <Tab label='teachers' component={NavLink} to='teachers'/>
              <Tab label='schools' component={NavLink} to='schools'/>
            </Tabs>

            <Stack direction="row" spacing={2} alignItems="center">
                {role !== 'user' ? <AccountCircle /> : <AdminPanelSettingsIcon />}
                <Stack>
                    <Typography
                        component='p'
                        variant="body1"
                    >
                        {userData[0].name}
                    </Typography>
                </Stack>
                <Button color="inherit" onClick={handleLogOut}>Log-Out</Button>
            </Stack>

            {/* <div>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>

                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    // onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
            </div>  */}
          </Toolbar>
        </AppBar>
      </Box>
    )
}
import { NavLink, useNavigate } from "react-router-dom"
import { AppBar, Box, Button, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Tab, Tabs, Toolbar, Typography, useMediaQuery } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from "react";
import AccountCircle from '@mui/icons-material/AccountCircle';
import useFetchData from "../hooks/useFetchData";
import config from "../config";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MenuIcon from '@mui/icons-material/Menu';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PersonIcon from '@mui/icons-material/Person';

export default function Navigation({role, userId}) {
    const [value, setValue] = useState(0)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // const [anchorEl, setAnchorEl] = useState(null);
    const matches = useMediaQuery('(min-width:700px)');

    const redirect = useNavigate()
    const {data: userData} = useFetchData(role === 'user' ? `${config.API_URL}/students?userId=${userId}` : `${config.API_URL}/teachers?userId=${userId}`, 'get', [role, userId])
    
    const handleLogOut = () => {
        localStorage.setItem('loggedIn', JSON.stringify(false))
        redirect('/')
        window.location.reload(true)
    }

    const handleTabs = (_, newValue) => {
        setValue(newValue);
    }

    // const handleMenu = (event) => {
    //     setAnchorEl(event.currentTarget);
    // }
    
    const pages = [
        { text: 'Students', link:'/', icon: <PersonIcon /> },
        { text: 'Groups', link:'groups', icon: <GroupsIcon /> },
        { text: 'Teachers', link:'teachers', icon: <SchoolIcon /> },
        { text: 'Schools', link:'schools', icon: <AccountBalanceIcon /> }
    ]

    if (role === 'administrative') {
        pages.unshift({ text: null, link:'/', icon: <SettingsIcon /> })
    }
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    {matches ? (
                        <Tabs sx={{ mr: 4 }} value={value} onChange={handleTabs} textColor='inherit'>
                            {pages.map(page => (
                                <Tab
                                    key={page.text + '-nav'}
                                    label={page.text || page.icon}
                                    component={NavLink}
                                    to={page.link}
                                />
                            ))}
                        </Tabs>
                    ) : (
                        <>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => setIsDrawerOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Drawer
                            open={isDrawerOpen}
                            onClose={() => setIsDrawerOpen(false)}
                        >
                            <List sx={{paddingRight: 4}}>
                                {pages.map(page => {
                                    const {icon, text, link} = page

                                    return (
                                        <ListItem
                                            key={text}
                                            component={NavLink}
                                            to={link}
                                            onClick={() => setIsDrawerOpen(false)}
                                            sx={{ margin: 2, color: 'inherit' }}
                                            button
                                        >
                                            <ListItemIcon>{icon}</ListItemIcon>
                                            <ListItemText primary={text} />
                                    </ListItem>
                                    )
                                })}
                            </List>
                        </Drawer>
                        </>
                    )}

                    <Stack direction="row" spacing={2} alignItems="center">
                        {role !== 'user' ? <AccountCircle /> : <AdminPanelSettingsIcon />}
                        <Stack>
                            <Typography
                                component='p'
                                variant="body1"
                            >
                                {userData[0] && userData[0].name}
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
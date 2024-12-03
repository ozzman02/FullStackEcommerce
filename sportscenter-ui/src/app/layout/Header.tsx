import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import { useEffect } from "react";

const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Store', path: '/store' },
    { title: 'Contact', path: '/contact' }
];

const accountLinks = [
    { title: 'Login', path: '/login' },
    { title: 'Register', path: '/register' }
];

const navStyles = {
    color: "inherit",
    typography: "h6",
    textDecoration: "none",
    "&:hover": {
        color: "secondary.main"
    },
    "&:active": {
        color: "text.secondary"
    }
};

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

/* 
    zIndex was applied because the card was going behind the app bar.
    padding was also applied in the main container on App.tsx: sx={{ paddingTop: "64px" }}  
*/
export default function Header({ darkMode, handleThemeChange }: Props) {

    const { basket } = useAppSelector(state => state.basket);
    
    const itemCount = basket?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

    useEffect(() => {
        
    }, [basket]);

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar sx={{ 
                display:"flex", 
                justifyContent: "space-between", 
                alignItems: "center" 
            }}>
                <Box display="flex" alignItems="center">
                    <Typography variant="h6">Sports Center</Typography>
                    <Switch checked={darkMode} onChange={handleThemeChange} />
                </Box>
                <List sx={{ display: "flex" }}>
                    {navLinks.map(({ title, path }) => (
                        <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                            {title}
                        </ListItem>
                    ))}
                </List>
                <Box display="flex" alignItems="center">
                    <IconButton component={Link} to='/basket' size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
                        <Badge badgeContent={itemCount} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <List sx={{ display: "flex" }}>
                        {accountLinks.map(({ title, path }) => (
                            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                                {title}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
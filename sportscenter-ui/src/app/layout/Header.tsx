import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

/* 
    zIndex was applied because the card was going behind the app bar.
    padding was also applied in the main container on App.tsx: sx={{ paddingTop: "64px" }}  
*/
export default function Header({ darkMode, handleThemeChange }: Props) {
    return(
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography variant="h6">Sports Center</Typography>
                <Switch checked={darkMode} onChange={handleThemeChange} />
            </Toolbar>
        </AppBar>
    )
}
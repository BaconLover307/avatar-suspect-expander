import React from "react";
import { Toolbar, AppBar, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
    typographyStyles: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 550,
        fontFamily: 'Herculanum',
        fontSize: '2rem',
    },
}));

const Header = () => {
    const classes = useStyles();
    return (
        <AppBar position="static" color="primary" className={classes.headerStyles}>
            <Toolbar>
                <Typography className={classes.typographyStyles}> Capital City Citizen Network</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
    
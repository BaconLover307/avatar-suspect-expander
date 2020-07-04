import React from "react";
import { Toolbar, AppBar, Typography, Icon } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles'
import CCCN from './assets/cccn.png'

const useStyles = makeStyles(theme => ({
    typographyStyles: {
        flex: 1,
        textAlign: 'left',
        fontWeight: 550,
        fontSize: '2rem',
        color: '#3B585A'
        
    },
    iconStyles: {
        height: '3rem',
        width: '3rem',
        margin: 'auto',
        padding: '0 1rem 0 0',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex'
        }
    },
    imgStyles: {
        height: '100%',
        width: '100%',
        objectFit: 'contain'
    }
}));

const Header = () => {
    const classes = useStyles();
    return (
        <AppBar position="static" color="primary" className={classes.headerStyles}>
            <Toolbar>
                <Icon className={classes.iconStyles}>
                    <img src={CCCN} className={classes.imgStyles} alt=''/>
                </Icon>
                <Typography className={classes.typographyStyles}> Capital City Citizen Network</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
    
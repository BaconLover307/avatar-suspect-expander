import React from "react";
import { Typography, IconButton } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles'
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles(theme => ({
    typographyStyles: {
        textAlign: 'center',
        fontWeight: 400,
        fontSize: '1rem',
        padding: '1rem',
    },
    iconStyles: {
        width: 50,
        height: 50
    }
}));

const Footer = () => {
    const classes = useStyles();
    return (
        <footer className="footer">
                <Typography className={classes.typographyStyles}> Gregorius Jovan Kresnadi | 13518135 </Typography>
                <IconButton href="https://github.com/BaconLover307/avatar-suspect-expander">
                    <GitHubIcon className={classes.iconStyles}/>
                </IconButton>
        </footer>
    )
}

export default Footer;
    
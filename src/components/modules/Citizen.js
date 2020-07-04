import React from "react";
import { makeStyles } from '@material-ui/styles'
import { Box,  Typography, Icon } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    boxStyles: {
        flex: 1,
        borderRadius: '1rem',
        fontWeight: 550,
        fontSize: '1rem',
        display: 'flex',
        flexDirection: 'row',
        color: 'white',
        margin: '0.5rem',
        alignItems: 'center',
        cursor: 'pointer'
    },
    idStyles: {
        alignSelf: 'center',
        padding: '0.6rem',
        backgroundColor: "rgba(255,255,255,0.3)",
        width: '1.5rem',
        borderRadius: '1rem',
        color: 'black',
        textAlign: 'center',
        margin: '0 0.7rem 0 0',
    },
    nameStyles: {
        flex: 1,
        alignSelf: 'center'
    },
    elmStyles: {
        alignSelf: 'center',
        textTransform: 'capitalize',
        padding: '0 0.5rem',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex'
        }

    },  
    iconStyles: {
        height: '2rem',
        width: '2rem',
        margin: 'auto',
        padding: '0.3rem'
    },
    imgStyles: {
        height: '100%',
        width: '100%',
        objectFit: 'contain'
    }

}));

const Citizen = (props) => {
    const classes = useStyles();
    return (
        <Box className={classes.boxStyles} bgcolor={props.color} onClick={props.onClick}>
            <Box className={classes.idStyles}>{props.id}</Box>
                <Typography noWrap className={classes.nameStyles} >{props.name}</Typography>
                <Typography className={classes.elmStyles}>{props.element}</Typography>
                <Icon className={classes.iconStyles}>
                    <img src={props.svg} className={classes.imgStyles}/>
                </Icon>
        </Box>
    )
}

export default Citizen;
    
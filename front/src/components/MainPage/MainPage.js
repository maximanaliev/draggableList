import React from 'react';
import {Nav, NavItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";
import Control from "../../containers/Control/Control";
import {makeStyles} from "@material-ui/core";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}));

const MainPage = () => {

    const classes = useStyles();

    const categories = useSelector(state => state.reducer.categories);

    return (
        <div className={classes.root}>
            <Nav pills>
                <NavItem>
                    <NavLink tag={RouterNavLink} to={'/'} exact>Все</NavLink>
                </NavItem>
                {categories.map((item, index) => (
                    <NavItem key={index}>
                        <NavLink tag={RouterNavLink} to={'/' + item.name}>{item.name}</NavLink>
                    </NavItem>
                ))}
            </Nav>
            <Control/>
        </div>
    );
};

export default MainPage;
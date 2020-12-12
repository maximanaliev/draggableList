import React, {useEffect} from 'react';
import {Nav, NavItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";
import Control from "../../containers/Control/Control";
import {makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getCategories, getItems} from "../../store/actions/actions";
import MyTable from "../../containers/Table/MyTable";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
    }
}));

const MainPage = props => {

    const classes = useStyles();

    const categories = useSelector(state => state.reducer.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getItems(props.match.params.name))
    }, [dispatch, props.match.params.name]);

    return (
        <>
            <div className={classes.root}>
                <Nav pills>
                    <NavItem>
                        <NavLink tag={RouterNavLink} to={'/'} exact>Все</NavLink>
                    </NavItem>
                    {categories && categories.map((item, index) => (
                        <NavItem key={index}>
                            <NavLink tag={RouterNavLink} to={'/' + item.name}>{item.name}</NavLink>
                        </NavItem>
                    ))}
                </Nav>
                <Control
                    params={props.match.params.name}
                />
            </div>
            <MyTable
                params={props.match.params.name}
            />
        </>

    );
};

export default MainPage;
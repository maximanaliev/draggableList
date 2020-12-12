import React, {useEffect, useRef, useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import NewItem from "../NewItem/NewItem";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
    span: {
        cursor: 'pointer'
    },
    arrowOpen: {
        transform: 'rotate(180deg)',
        transition: 'transform 0.2s',
    },
    arrow: {
        transition: 'transform 0.2s',
    },
}));

const Control = props => {

    const classes = useStyles();

    const anchorRef = useRef(null);

    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);


    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const  handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root}>
            <div>
                <span
                    ref={anchorRef}
                    onClick={handleToggle}
                    className={classes.span}
                >
                    Управление
                </span>
                <ArrowDropDownIcon
                    className={open ? classes.arrowOpen : classes.arrow}
                />
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
                                        <MenuItem
                                            onClick={handleClickOpen}
                                        >
                                            Добавить товар
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
            <NewItem
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                params={props.params}
            />
        </div>
    );
};

export default Control;
import React, {useEffect, useState} from 'react';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch, useSelector} from "react-redux";
import {apiURL} from "../../constants";
import {deleteItem} from "../../store/actions/actions";

const SortableItem = sortableElement(({value, cl}) => <TableRow className={cl}>{value}</TableRow>);

const SortableContainer = sortableContainer(({children}) => {
    return <Table>{children}</Table>;
});

const useStyles = makeStyles((theme) => ({
    row: {
        backgroundColor: 'rgb(242, 242, 242, 0.7)',
        display: 'block',
        marginTop: theme.spacing(1)
    },
    cell: {
        width: '20%'
    },
    delete: {
        color: 'red',
        cursor: 'pointer',
        textDecoration: 'underline',
        border: 'none',
        backgroundColor: 'rgb(242, 242, 242, 0.7)',
        '&:focus': {
            outline: 0
        }
    },
    img: {
        maxWidth: 50,
        maxHeight: 50
    }
}));

const MyTable = props => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const items = useSelector(state => state.reducer.items);

    const [item, setItem] = useState([]);

    useEffect(() => {
        setItem(items)
    }, [items]);

    const onSortEnd = ({oldIndex, newIndex}) => {
        setItem(arrayMove(item, oldIndex, newIndex));
    };

    const remove = id => {
        dispatch(deleteItem(id, props.params))
    };

    return (
        <TableContainer component={Paper}>
            <SortableContainer onSortEnd={onSortEnd}>
                <TableBody>
                    {item && item.map((row, i) => (
                        <SortableItem
                            cl={classes.row}
                            key={row._id}
                            index={i}
                            value={(
                                <>
                                    <TableCell className={classes.cell}>
                                        <img
                                            className={classes.img}
                                            src={
                                            row.image === 'good.png' ?
                                                apiURL + '/uploads/fixtures/' + row.image :
                                                apiURL + '/uploads/goods/' + row.image
                                        }
                                            alt=""
                                        />
                                    </TableCell>
                                    <TableCell className={classes.cell}>{row.name}</TableCell>
                                    <TableCell className={classes.cell}>{row.price} руб.</TableCell>
                                    <TableCell className={classes.cell}>{row.category.name}</TableCell>
                                    <TableCell className={classes.cell}>{row.quantity}шт</TableCell>
                                    <TableCell>
                                        <button
                                            className={classes.delete}
                                            onClick={() => remove(row._id)}
                                        >
                                            удалить
                                        </button>
                                    </TableCell>
                                </>
                            )}/>
                    ))}
                </TableBody>
            </SortableContainer>
        </TableContainer>
    );
};

export default MyTable;
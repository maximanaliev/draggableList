import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormElement from "../../components/UI/Form/FormElement";
import {useDispatch, useSelector} from "react-redux";
import TextField from "@material-ui/core/TextField";
import {addItem} from "../../store/actions/actions";

const NewItem = props => {

    const dispatch = useDispatch();
    const categories = useSelector(state => state.reducer.categories);

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');

    const state = (
        {
            name,
            quantity,
            image,
            price,
            category ,
        }
    );

    const submit = event => {
        event.preventDefault();
        const formData = new FormData();
        for (let key in state) {
            formData.append(key, state[key]);
        }
        dispatch(addItem(formData, props.params))
    };

    return (
        <div>
            <Dialog
                open={props.openDialog}
                onClose={props.handleCloseDialog}
            >
                <DialogTitle>Добавить товар</DialogTitle>
                <DialogContent>
                    <form
                        onSubmit={submit}
                    >
                        <div>
                            <FormElement
                                required
                                propertyName="name"
                                value={name}
                                title="Название товара"
                                onChange={event => setName(event.target.value)}
                                placeholder="Название"
                                autoComplete="new-name"
                            />
                            <FormElement
                                required
                                propertyName="quantity"
                                value={quantity}
                                title="Количество"
                                onChange={event => setQuantity(event.target.value)}
                                placeholder="Количество"
                                autoComplete="new-quantity"
                            />
                            <FormElement
                                propertyName="image"
                                title="Фото"
                                onChange={event => setImage(event.target.files[0])}
                                type="file"
                            />
                            <FormElement
                                required
                                propertyName="price"
                                value={price}
                                title="Цена"
                                onChange={event => setPrice(event.target.value)}
                                placeholder="Цена"
                                autoComplete="new-price"
                            />
                        </div>
                        <TextField
                            style={{width: '100%', margin: '8px 0'}}
                            select
                            value={category}
                            onChange={event => setCategory(event.target.value)}
                            SelectProps={{
                                native: true,
                            }}
                            variant="outlined"
                        >
                            <option disabled value="">
                                Выберите категорию
                            </option>
                            {categories && categories.map((option) => (
                                <option key={option._id}>
                                    {option.name}
                                </option>
                            ))}
                        </TextField>
                        <Button
                            onClick={props.handleCloseDialog}
                            color="primary"
                            type="submit"
                        >
                            Добавить
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default NewItem;
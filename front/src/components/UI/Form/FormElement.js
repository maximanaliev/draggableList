import React from 'react';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import FileInput from "./FileInput";

const FormElement = props => {

    const myStyle = {
        backgroundColor: '#fff',
        borderRadius: 5,
        margin: '8px 0'
    };

    let inputChildren = undefined;

    let inputComponent = (
        <TextField
            fullWidth
            variant="outlined"
            label={props.title}
            error={!!props.error}
            type={props.type}
            select={props.type === 'select'}
            name={props.propertyName}
            id={props.propertyName}
            value={props.value}
            onChange={props.onChange}
            required={props.required}
            autoComplete={props.autoComplete}
            placeholder={props.placeholder}
            children={inputChildren}
            helperText={props.error}
            style={myStyle}
            InputProps={props.inputProps}
        >
            {inputChildren}
        </TextField>
    );

    if (props.type === 'file') {
        inputComponent = (
            <FileInput
                image={props.image}
                label={props.title}
                name={props.propertyName}
                onChange={props.onChange}
                style={myStyle}
            />
        )
    }

    return inputComponent;
};

FormElement.propTypes = {
    propertyName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    options: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    autoComplete: PropTypes.string,
};

export default FormElement;
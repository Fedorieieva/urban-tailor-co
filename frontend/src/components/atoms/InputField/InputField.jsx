import React from "react";
import PropTypes from "prop-types";
import {Field, ErrorMessage} from 'formik';
import Typography from "../../../shared/ui/Typography/Tupography.jsx";
import style from './style.module.scss';
import cn from 'classnames';

const InputField = (props) => {
    const {name, type = 'text', placeholder = '', className} = props;
    return (
        <div className={cn(style.inputFieldContainer, className)}>
            <Field
                name={name}
                type={type}
                placeholder={placeholder}
                className={style.fieldInput}
            />
            <ErrorMessage
                name={name}
                component={({children}) => (
                    <Typography isError underline variant='text-xs'>
                        {children}
                    </Typography>
                )}
            />
        </div>
    );
};

InputField.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string
}

export default InputField

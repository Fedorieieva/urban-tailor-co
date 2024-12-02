import React from "react";
import PropTypes from "prop-types";
import {Field} from "formik";
import style from './style.module.scss';
import cn from 'classnames';

const SelectField = ({name, options, placeholder, className, ...props}) => {
    return (
        <div className={cn(style.selectInput, className)}>
            <Field as="select" name={name} {...props}>
                <option value="">{placeholder}</option>
                {options.map(({value, label, index}) => (
                    <option key={index} value={value}>
                        {label}
                    </option>
                ))}
            </Field>
        </div>
    );
};

SelectField.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    placeholder: PropTypes.string,
};

SelectField.defaultProps = {
    placeholder: "Select an option",
};

export default SelectField;

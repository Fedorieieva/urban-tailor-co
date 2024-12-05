import React from "react";
import PropTypes from "prop-types";
import {Field, FormikContext} from "formik";
import style from './style.module.scss';
import cn from 'classnames';

const SelectField = ({name, options, placeholder, className, value, onChange, ...props}) => {
    const formikContext = React.useContext(FormikContext);
    const isFormik = !!formikContext;
    const handleChange = isFormik ? undefined : onChange;

    return (
        <div className={cn(style.selectInput, className)}>
            {isFormik ? (
                <Field as="select" name={name} {...props}>
                    <option value="">{placeholder}</option>
                    {options.map(({value, label}, index) => (
                        <option key={index} value={value}>
                            {label}
                        </option>
                    ))}
                </Field>
            ) : (
                <select
                    name={name}
                    value={value}
                    onChange={handleChange}
                    {...props}
                    className={style.select}
                >
                    <option value="">{placeholder}</option>
                    {options.map(({value, label}, index) => (
                        <option key={index} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
            )}
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
    className: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

export default SelectField;

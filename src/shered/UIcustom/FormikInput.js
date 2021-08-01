import React from "react";
import { Field, ErrorMessage } from 'formik';

const FormikInput = props => {
    const { label, name, validationError, ...rest} = props;
    return <div>
        <label 
            htmlFor={name}
            className="form-control__label">{label}
        </label>
        <Field 
            className={!validationError ? 'form-control__input' : 'form-control__input--error' }
            id={name} 
            name={name}
            {...rest}/>
        <div className="form-control__message--error">
        <ErrorMessage name={name}/>
        </div>
    </div>
}

export default FormikInput;
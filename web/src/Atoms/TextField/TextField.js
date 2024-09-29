// import { getIn } from 'formik'
import { ErrorMessage, getIn } from 'formik'
// import { FormFeedback, Input } from 'reactstrap'
import { Input } from 'reactstrap'
import EInvalidFeedback from '../EInvalidFeedback/EInvalidFeedback'
import classNames from 'classnames'
import Styled from 'styled-components'
import { useState } from 'react'
import InputMask from 'react-input-mask'
import EDatePicker from '../EDatePicker/EDatePicker'
import _ from 'lodash'
//
const TextField = (props) => {
    // To Visible the password field
    const [showPassword, setShowPassword] = useState(false)
    //
    const errorMessage = getIn(props?.form?.errors, props?.field?.name)
    const isTouch = getIn(props?.form?.touched, props?.field?.name)
    let Type = props.type
    if (props.type === 'password') {
        if (showPassword) {
            Type = 'text'
        }
    }
    if (props.isSearch) {
        const finalProps = _.omit(props, ['isSearch'])
        return (
            <InputBoxStyle>
                <Input
                    {...finalProps.field}
                    {...finalProps}
                    type={Type}
                    // onChange={props.onChange}
                    className={classNames(finalProps.className, {
                        'is-invalid': errorMessage && isTouch
                    })}
                />
                <i className='bx bx-search' />
            </InputBoxStyle>
        )
    }

    const onChange = (e) => {
        if (Array.isArray(props.resetvalue)) {
            // eslint-disable-next-line no-restricted-syntax
            for (const name of props.resetvalue) {
                props.form.setFieldValue(name, '')
            }
        }
        if (props.resetform) {
            props.form.resetForm()
        }

        if (props.type === 'checkbox') {
            props.form.setFieldValue(props.field.name, e.target.checked)
            return
        }

        props.form.setFieldValue(props.field.name, e.target.value)
    }

    const onWheelChange = (e) => {
        e.target.blur()
    }

    if (props.type === 'radio') {
        return (
            <>
                <Input
                    {...props.field}
                    {...props}
                    type={Type}
                    onChange={onChange}
                    className={classNames(props.className, {
                        'is-invalid': errorMessage && isTouch
                    })}
                />
                <ErrorMessage name={props?.field?.name} render={EInvalidFeedback} />
            </>
        )
    }

    if (props.type === 'mask') {
        return (
            <>
                <InputMask
                    {...props.field}
                    {...props}
                    onChange={onChange}
                    mask='999-999-9999'
                    className='form-control'
                />
                 {props.isPhone ? <i className='bx bx-phone-call phone-icon' /> : null} 
                <ErrorMessage name={props?.field?.name} render={EInvalidFeedback} />
            </>
        )
    }
    if (props.type === 'datepicker') {
        return <EDatePicker {...props} />
    }

    return (
        <>
            <InputBoxStyle>
                <Input
                    {...props.field}
                    {...props}
                    type={Type}
                    onChange={onChange}
                    onWheel={Type === 'number' ? (e) => onWheelChange(e) : null}
                    className={classNames(props.className, {
                        'is-invalid': errorMessage && isTouch
                    })}
                />
                {props.type === 'password' ? (
                    showPassword ? (
                        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                        <i className='fas fa-eye' onClick={() => setShowPassword(!showPassword)} />
                    ) : (
                        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                        <i
                            className='fas fa-eye-slash'
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    )
                ) : null}
                {props.isSearch ? <i className='bx bx-search' /> : null}
                {props.isEmailicon ? <i className='bx bx-envelope' /> : null}
                {props.isPhone ? <i className='bx bx-phone-call' /> : null} 
            </InputBoxStyle>
            <ErrorMessage name={props?.field?.name} render={EInvalidFeedback} />
        </>
    )
}

export default TextField

const InputBoxStyle = Styled.div`
        position: relative; 
    i {
        position: absolute;
        top: 30%;
        right: 2%;
        cursor: pointer;
    }
`

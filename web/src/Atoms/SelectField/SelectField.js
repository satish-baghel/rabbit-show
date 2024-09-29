import classNames from 'classnames'
import { ErrorMessage, getIn } from 'formik'
import { Input } from 'reactstrap'
import EInvalidFeedback from '../EInvalidFeedback/EInvalidFeedback'
import Select from 'react-select'

const SelectField = (props) => {
    const { option } = props
    const errorMessage = getIn(props?.form?.errors, props?.field?.name)
    const isTouch = getIn(props?.form?.touched, props?.field?.name)

    const onChange = (e) => {
        props.form.setFieldValue(props.field.name, e.target.value)
        if (Array.isArray(props.resetvalue)) {
            // eslint-disable-next-line no-restricted-syntax
            for (const name of props.resetvalue) {
                props.form.setFieldValue(name, '')
            }
        }

        // props.
    }
    if (props.isSelect) {
        return (
            <>
                <Select
                    {...props.field}
                    {...props}
                    value={option.find((q) => q.value === props.value)}
                    onChange={props?.hasOnChange ? props.onChange : onChange}
                    className={classNames(props.className, {
                        'is-invalid': errorMessage && isTouch
                    })}
                    options={option}
                />
                <ErrorMessage name={props?.field?.name} render={EInvalidFeedback} />
            </>
        )
    }
    return (
        <>
            <Input
                {...props.field}
                {...props}
                onChange={onChange}
                className={classNames(props.className, {
                    'is-invalid': errorMessage && isTouch
                })}
            >
                <option value=''>Select </option>
                {Array.isArray(option)
                    ? option.map((opt) => (
                          <option value={opt?.value} key={opt?.value}>
                              {opt?.label}
                          </option>
                      ))
                    : null}
            </Input>
            <ErrorMessage name={props?.field?.name} render={EInvalidFeedback} />
        </>
    )
}

export default SelectField

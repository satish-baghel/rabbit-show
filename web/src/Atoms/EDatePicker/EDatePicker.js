import classNames from 'classnames'
import { getMonth, getYear } from 'date-fns'
import { ErrorMessage, getIn } from 'formik'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import EInvalidFeedback from '../EInvalidFeedback/EInvalidFeedback'

const EDatePicker = (props) => {
    const { selected, onChange, dateFormat } = props
    const errorMessage = getIn(props?.form?.errors, props?.field?.name)
    const isTouch = getIn(props?.form?.touched, props?.field?.name)
    const years = generateYearsBetween(2018, getYear(new Date()) + 15, 1)

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
    return (
        <>
            <DatePicker
                wrapperClassName='w-100'
                minDate={new Date(years[0], '0', '01')}
                maxDate={new Date(years[years.length - 1], '11', '31')}
                renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled
                }) => (
                    <div
                        style={{
                            margin: 10,
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <button
                            type='button'
                            onClick={decreaseMonth}
                            disabled={prevMonthButtonDisabled}
                        >
                            {'<'}
                        </button>
                        <select
                            value={getYear(date)}
                            onChange={({ target: { value } }) => changeYear(value)}
                        >
                            {years.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>

                        <select
                            value={months[getMonth(date)]}
                            onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
                        >
                            {months.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>

                        <button
                            type='button'
                            onClick={increaseMonth}
                            disabled={nextMonthButtonDisabled}
                        >
                            {'>'}
                        </button>
                    </div>
                )}
                selected={selected}
                onChange={onChange}
                dateFormat={!dateFormat && 'MMM do yyyy'}
                onKeyDown={(e) => {
                    if (e.key !== 'Backspace' || e.key === 'Delete') {
                        e.preventDefault()
                    }
                }}
                autoComplete='off'
                className={classNames(`form-control w-100 ${props.className} `, {
                    'is-invalid': errorMessage && isTouch
                })}
                {...props.field}
                {...props}
            />
            <ErrorMessage name={props?.field?.name} render={EInvalidFeedback} />
        </>
    )
}

export default EDatePicker

//
function generateYearsBetween(startYear = 2000, endYear) {
    const endDate = endYear || new Date().getFullYear()
    const years = []
    for (let i = startYear; i <= endDate; i++) {
        years.push(startYear)
        startYear++
    }
    return years
}

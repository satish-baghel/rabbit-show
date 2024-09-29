import _ from 'lodash'
import { Button, Spinner } from 'reactstrap'

const EButton = (props) => {
    const { title = 'Submit' } = props
    const btnProps = _.omit(props, 'loadingProps')

    if (props.disabled && title) {
        return <Button {...btnProps}>{title}</Button>
    }
    if (props.children) {
        return <Button {...btnProps}>{props.children}</Button>
    }

    // for submit button
    const { isLoading = false, isSubmitting = false } = props.loadingProps
    return (
        <Button {...btnProps} disabled={isLoading && isSubmitting}>
            {!isLoading && !isSubmitting ? title : null}
            {isLoading && !isSubmitting ? title : null}
            {isLoading && isSubmitting ? (
                <Spinner style={{ width: '0.7rem', height: '0.7rem' }} type='grow' color='light' />
            ) : null}
        </Button>
    )
}

export default EButton

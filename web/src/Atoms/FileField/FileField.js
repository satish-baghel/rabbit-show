import { ErrorMessage, getIn, useFormikContext } from 'formik'

import EInvalidFeedback from '../EInvalidFeedback/EInvalidFeedback'
import classNames from 'classnames'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import ImageCopper from 'src/components/ImageCopper/ImageCopper'
import { Col, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { Button } from '..'

const FileField = (props) => {
    const inputProp = _.pick(props, [
        'accept',
        'className',
        'type',
        'field.name',
        'field.onBlur',
        'field.onChange'
    ])

    const file = _.get(props?.form?.values, inputProp?.field?.name)

    // state
    const [selectedFiles, setSelectedFiles] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null)
    const { setFieldValue } = useFormikContext()

    // Modal
    const [showModal, setShowModal] = useState(false)

    // Formik
    const errorMessage = getIn(props?.form?.errors, props?.field?.name)
    const isTouch = getIn(props?.form?.touched, props?.field?.name)

    //
    const { useCrop, cropRectangle } = props

    useEffect(() => {
        if (file && !errorMessage && isTouch) {
            // eslint-disable-next-line no-debugger
            // debugger
            if (!useCrop) {
                const type = file.name.split('.').pop()
                const date = new Date().getTime()
                const renameFIle = new File([file], `${date}.${type}`, {
                    type: file?.type
                })
                setFieldValue(props.inputName, renameFIle)
            } else {
                if (props.cropModal && typeof isTouch === 'boolean') {
                    setFieldValue(props.inputName, null)
                    setCroppedImage(null)
                    setShowModal(true)
                }
                setSelectedFiles(URL.createObjectURL(file))
            }
        } else {
            setFieldValue(props.inputName, null)
            setSelectedFiles(null)
        }
    }, [errorMessage, file, isTouch, props.cropModal, props.inputName, useCrop])

    //
    //
    return (
        <>
            <input
                {...inputProp.field}
                {...inputProp}
                onChange={(event) => {
                    setFieldValue(inputProp.field.name, event.currentTarget.files[0])
                }}
                // onChange={(e) => handleChange(e)}
                className={classNames(props.className, {
                    'is-invalid': errorMessage && isTouch
                })}
            />
            <ErrorMessage name={props?.field?.name} render={EInvalidFeedback} />
            <br />

            {!croppedImage && _.get(props?.form?.values, props.previewImg) ? (
                <div className='mt-3'>
                    <img
                        src={_.get(props?.form?.values, props.previewImg)}
                        alt='profile'
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: '50%'
                        }}
                    />
                </div>
            ) : null}
            {!props.cropModal && selectedFiles ? (
                <Col xl={12}>
                    <ImageCopper
                        selectedFiles={selectedFiles}
                        setCroppedImage={setCroppedImage}
                        setFieldValue={setFieldValue}
                        croppedImage={croppedImage}
                        inputName={props.inputName}
                    />
                </Col>
            ) : props.cropModal && selectedFiles ? (
                <Modal isOpen={showModal}>
                    <ModalHeader toggle={() => setShowModal(false)}>Image Cropper</ModalHeader>
                    <ModalBody>
                        <ImageCopper
                            selectedFiles={selectedFiles}
                            setCroppedImage={setCroppedImage}
                            setFieldValue={setFieldValue}
                            croppedImage={croppedImage}
                            inputName={props.inputName}
                            size
                            cropRectangle={cropRectangle}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color='warning' onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            ) : null}
        </>
    )
}

export default FileField

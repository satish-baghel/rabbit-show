/* eslint-disable prefer-regex-literals */
/* eslint-disable no-useless-escape */
// Regex

import _ from 'lodash'

// ******************************************************************  Validation **************************************************************

export const EMAIL_REGEX = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
)
export const PASSWORD_REGEX = new RegExp(
    /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,15}$/
)

export const ONLY_CHAR_REGEX = new RegExp(/^[A-Za-z  -]*$/)

export const ONLY_NUMBER_REGEX = new RegExp(
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
)
export const ONLY_NUMBER_WITH_DASH = new RegExp(/^[0-9][0-9\-\+\.]*$/)
export const ONLY_ALLOW_NUMBER_AND_CHAR = new RegExp(/^[a-zA-Z0-9 -]+$/)
export const URL_REGEX = () =>
    new RegExp(
        /\b(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b(?:\/[a-zA-Z0-9+&@#\/%?=~-]*)?/g
    )

export const isValidUrl = (url) => {
    try {
        new URL(url)
    } catch (e) {
        return false
    }
    return true
}
export const SUPPORTED_FORMATS_IMG = ['image/jpeg', 'image/png', 'image/gif']
export const SUPPORTED_FORMATS_DOC = ['application/pdf']
export const MAX_FILE_SIZE = 4096 // 4MB
export const MAX_FILE_SIZE_5 = 5096 // 5MB
// ******************************************************************  Utils **************************************************************

export const fullName = (data) =>
    _.compact([data?.last_name || '', data?.first_name || '']).join(' ')

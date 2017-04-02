import React from 'react'

import styles from './FormSubmitFeedback.scss'

export default ({children, type = 'success'}) => {
  return (<span className={styles[type]}>{children}</span>)
}

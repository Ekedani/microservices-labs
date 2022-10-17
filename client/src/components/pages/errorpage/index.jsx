import React from 'react'
import styles from './errorpage.module.scss';
export const ErrorPage = () => {
  return (
      <div className={styles.container}>
        <h1>Ooops</h1>
        <h2>Looks like something went wrong and this page doesn`t exist`:(</h2>
        <hr />
      </div>
    )
}

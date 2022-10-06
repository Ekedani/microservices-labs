import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import styles from './user-modal.module.scss';

export const UserModal = ({userID, username, tag}) => {
  const onClick = () => {
    <Route path='/api/users/:id' element={ <Navigate to="/error-page" /> }/>
  }
  return (
      <div className={styles.container} onClick={onClick}>
        <div className={styles.avatar}>
          {username[0]}
        </div>
        <span>
          {username} (@{tag})
        </span>
      </div>
    )
}

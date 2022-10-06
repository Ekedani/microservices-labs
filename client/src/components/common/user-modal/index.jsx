import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './user-modal.module.scss';

export const UserModal = ({userID, username, tag}) => {
  const navigate = useNavigate();
  const onClick = () => {
    if (userID) {
      return navigate(`/api/users/${userID}`)
    }
    return navigate(`/oops`)
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

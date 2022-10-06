import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './user-modal.module.scss';

export const UserModal = ({userID, username, tag}) => {
  const navigate = useNavigate();
  const onClick = () => {
    if (userID) {
      return navigate(`/api/users/${userID}`)
    }
    return navigate(`/oops`)
  }
  const deleteUser = async () => {
    await axios.delete(`/api/delete/${userID}`);
  }
  const editUser = async () => {
    const newName = prompt('Input new name');
    await axios.patch(`/api/users/${userID}`, {
      username: newName,
    });
  }
  return (
      <div className={styles.container} onClick={onClick}>
        <div className={styles.avatar}>
          {username[0]}
        </div>
        <span>
          {username} (@{tag})
        </span>
        <div className={styles.buttons}>
          <button onClick={editUser}>Edit name</button>
          <button onClick={deleteUser}>Delete</button>
        </div>
      </div>
    )
}

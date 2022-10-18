import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import styles from './user-modal.module.scss';

export const UserModal = ({userID, username, tag}) => {
  const navigate = useNavigate();
  const onClick = () => {
    if (userID) {
      return navigate(`/api/users/${userID}`);
    }
    return navigate(`/oops`);
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
        <Avatar className={styles.avatar} sx={{ bgcolor: '#004578' }}>
          {username[0]}
        </Avatar>
        <span>
          {username} (@{tag})
        </span>
        <div className={styles.buttons}>
          <Button variant="contained" onClick={editUser}>Edit name</Button>
          <Button variant="contained" onClick={deleteUser}>Delete</Button>
        </div>
      </div>
    )
}

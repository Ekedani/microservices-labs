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
  return (
      <div className={styles.container} onClick={onClick}>
        <Avatar className={styles.avatar} sx={{ bgcolor: '#004578' }}>
          {username[0]}
        </Avatar>
        <span>
          {username} <div className={styles.tag}>&nbsp;(@{tag})</div>
        </span>
        <div className={styles.vertical} style={{
            marginLeft: 'auto'}}>
          <b>3</b>
          total score
        </div>
      </div>
    )
}

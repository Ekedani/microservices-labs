import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import styles from './navbar.module.scss';

export const NavBar = () => {
  const navigate = useNavigate();
  const redirectToAuth = () => {
    return navigate(`/auth`)
  }
  
  return (
      <div className={styles.container}>
        <h6>Best blog you`ve ever seen!</h6>
        <a href='/users'>Users</a>
        <a href='/posts'>Posts</a>
        <Avatar
          sx={{ width: 30, height: 30 }}
          style={{
            backgroundColor: '#cad9e6',
            color: '#336488',
            marginLeft: 'auto',
            cursor: 'pointer',
            fontWeight: 'bold'}}
          onClick = {redirectToAuth}
        >
            ?
        </Avatar>
      </div>
    )
}

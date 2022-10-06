import React from 'react'
import styles from './navbar.module.scss';

export const NavBar = (author, body) => {
  return (
      <div className={styles.container}>
        <h6>Best blog you`ve ever seen!</h6>
        <a href='/users'>Users</a>
        <a href='/feed'>Posts</a>
      </div>
    )
}

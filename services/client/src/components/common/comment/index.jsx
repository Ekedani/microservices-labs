import React from 'react'
import styles from './comment.module.scss';

export const Comment = (author, body) => {

  return (
      <div className={styles.container}>
        <h6>{author.username}</h6>
        <p>{body}</p>
      </div>
    )
}

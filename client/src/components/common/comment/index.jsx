import React, { useParams } from 'react'
import axios from 'axios';
import styles from './comment.module.scss';

export const Comment = (author, body, postID) => {
  const { id } = useParams();
  const deleteComment = async () => {
    await axios.delete(`delete /api/posts/${postID}/comments/${id}`);
  }
  return (
      <div className={styles.container}>
        <h6>{author.username}</h6>
        <button onClick={deleteComment}>Delete</button>
        <p>{body}</p>
      </div>
    )
}

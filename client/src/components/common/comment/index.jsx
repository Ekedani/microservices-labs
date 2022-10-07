import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './comment.module.scss';

export const Comment = (author, body, postID) => {
  const { id } = useParams();
  const deleteComment = async () => {
    await axios.delete(`/api/posts/${postID}/comments/${id}`);
  }
  return (
      <div className={styles.container}>
        <h6>{author.username}</h6>
        <button onClick={deleteComment}>Delete</button>
        <p>{body}</p>
      </div>
    )
}

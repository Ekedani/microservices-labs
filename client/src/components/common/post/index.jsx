import React, { useEffect } from 'react'
import styles from './comment.module.scss';
import { Comment } from '../comment';
export const Post = (postID, authorID) => {
  let post = {
    header: 'Header',
    body: 'body',
    author: 'Author',
    comments: ['Header 1', 'Header 2', 'Header 3', 'Header 4'],
  };

  useEffect(() => {
    // get from db
  });  
  return (
      <div className={styles.container}>
        <h1>{post.header} by {post.author}</h1>
        <hr />
        <p>{post.body}</p>
        <hr />
        {post.comments.map(comment => 
          <Comment author={comment.author} body={comment.body} />)}
      </div>
    )
}

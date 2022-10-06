import React, { useEffect, useParams, useState } from 'react';
import axios from 'axios';
import styles from './post.module.scss';
import { Comment } from '../../common/comment';
export const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {async function fetchData(){
    let resnonse = await axios.get(`/api/posts/${id}/comments`);
    setPost(resnonse);
    resnonse = await axios.get(`/api/posts/${id}/comments`)
    setComments(resnonse);
  }
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

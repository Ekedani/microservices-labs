import React, { useEffect, useParams, useState } from 'react';
import axios from 'axios';
import styles from './post.module.scss';
import { Comment } from '../../common/comment';
export const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {async function fetchData(){
    const resnonse = await axios.get(`/api/posts/${id}/comments`);
    setPost(resnonse);
  }});
  useEffect(() => {async function fetchData(){
    const resnonse = await axios.get(`/api/posts/${id}/comments`)
    setComments(resnonse);
  }}, [comments]);
  const addComment = async () => {
    const body = prompt('What you wanna say?');
    await axios.post(`/api/posts/${id}/comments`, {
      body,
    })
  }
  return (
      <div className={styles.container}>
        <h1>{post.header} by {post.author}</h1>
        <hr />
        <p>{post.body}</p>
        <hr />
        <div className={styles.center} >
          <button onClick={addComment}>Add comment</button>
        </div>
        {post.comments.map(comment => 
          <Comment author={comment.author} body={comment.body} postID={id} />)}
      </div>
    )
}

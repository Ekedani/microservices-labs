import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './post-modal.module.scss';

export const PostModal = ({postID, authorID}) => {
  const WORDS_PER_MINUTE = 200;
  const navigate = useNavigate();
  //TODO: get from props
  const [data, setData] = useState({
    header: 'Header',
    body: 'Body',
  });
  useEffect(() => {
    if (authorID) {
      const author = {
        username: 'prikol',
        tag: 'mem',
      }
      setData({...data, author: author});
    }
  }, []);
  const onClick = () => {
    if (postID) {
      return navigate(`/posts/${postID}`);
    }
    return navigate(`/oops`);
  }
  const deletePost = async (postID) => {
    await axios.delete(`/posts/delete/${postID}`);
  }
  const numberOfWords = data.body.split(' ').length;
  const timeToRead = Math.ceil(numberOfWords / WORDS_PER_MINUTE);
  return (
      <div className={styles.container} onClick={onClick}>
        <div>
          <header>{data.header}</header>
          {
            data.author ?
            <p>&nbsp;by&nbsp;<a href={'google.com'}>{data.author.username}</a></p>
            :
            null
          }
        </div>
        <span>🕐 {timeToRead}min</span>
      </div>
    )
}

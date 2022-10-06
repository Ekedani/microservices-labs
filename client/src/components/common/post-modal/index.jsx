import React, { useEffect, useState } from 'react'
import styles from './post-modal.module.scss';

export const PostModal = ({header, body, authorID, onClick}) => {
  const WORDS_PER_MINUTE = 200;
  //TODO: get from props
  const [data, setData] = useState({
    header,
    body,
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
  const numberOfWords = data.body.split(' ').length;
  const timeToRead = Math.ceil(numberOfWords / WORDS_PER_MINUTE);
  return (
      <div className={styles.container} onClick={onClick}>
        <div>
          <header>{header}</header>
          {
            data.author ?
            <p>&nbsp;by&nbsp;<a href={'google.com'}>{data.author.username}</a></p>
            :
            <></>
          }
        </div>
        <span>🕐 {timeToRead}min</span>
      </div>
    )
}

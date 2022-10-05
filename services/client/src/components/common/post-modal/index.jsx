import React from 'react'
import styles from './post-modal.module.scss';

export const PostModal = ({header, body, onClick}) => {
  const WORDS_PER_MINUTE = 200;
  //TODO: get from props
  let data = {
    header,
    body: 'Body text',
  };
  const numberOfWords = data.body.split(' ').length;
  const timeToRead = Math.ceil(numberOfWords / WORDS_PER_MINUTE);
  return (
      <div className={styles.container} onClick={onClick}>
        <header>{header}</header>
        <span>🕐 {timeToRead}min</span>
      </div>
    )
}

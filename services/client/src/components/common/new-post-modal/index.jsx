import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './new-post-modal.module.scss';

export const NewPostModal = ({positiveOnClick, negativeOnClick}) => {
  const WORDS_PER_MINUTE = 200;
  const navigate = useNavigate();
  //TODO: get from db
  // const numberOfWords = data.body.split(' ').length;
  // const timeToRead = Math.ceil(numberOfWords / WORDS_PER_MINUTE);
  return (
    <div className={styles.megaContainer}>
      <div className={styles.container}>
        <header>New post</header>
        <div>
          <input placeholder='Caption' />
          <textarea className={styles.tallInput} placeholder='What`s on your mind?'></textarea>
        </div>
        <div className={styles.horizontal}>
          <button className={styles.positive} onClick={positiveOnClick}>POST</button>
          <button onClick={negativeOnClick}>DISCARD</button>
        </div>
      </div>
    </div>
    )
}

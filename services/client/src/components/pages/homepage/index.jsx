import React, { useEffect, useState } from 'react'
import axios from 'axios';
import styles from './homepage.module.scss';
import { PostModal } from '../../common/post-modal';
import { NewPostModal } from '../../common/new-post-modal';
export const HomePage = (postID, authorID) => {
  const [newPostInput, setNewPostInput] = useState(false);
  let posts = [
    {
      header: 'Header 1',
      body: 'Some text for blog 1',
      authorID: 1,
    },
    {
      header: 'Header 2',
      body: 'Some text for blog 2',
      authorID: 2,
    },
    {
      header: 'Header 3',
      body: 'Some text for blog 3',
      authorID: 3,
    }
  ];

  useEffect(() => {
    // get from db
  });
  const clicked = () => {
    //TODO redirect
  }
  const buttonClicked = () => {
    setNewPostInput(true);
  }
  const discardOnClick = () => {
    setNewPostInput(false);
  }
  const submitNewPost = async (caption, content) => {
    const req = await JSON.stringify({
      caption,
      content,
    });
    await axios.post('/api/posts', req);
  }
  return (
      <div className={styles.container}>
        {newPostInput ?
          <NewPostModal
            positiveOnClick={submitNewPost}
            negativeOnClick={discardOnClick} /> : null } 
        <h1>Latest posts</h1>
        <div className={styles.newPost}>
          <h3>Have something on mind?</h3>
          <button onClick={buttonClicked}>Create</button>
        </div>
        <hr />
        {
          posts.length > 0 ?
          (
            <div>
              {posts.map((post, i) =>
                <PostModal key={i}
                  header={post.header}
                  body={post.body}
                  authorID={post.authorID}
                  onClick={clicked}
                />)}
            </div>
          )
          :
            <p className={styles.postsCount}>No one uses this fucking blog :(</p>
        }
      </div>
    )
}

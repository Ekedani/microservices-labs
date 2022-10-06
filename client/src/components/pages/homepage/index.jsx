import React, { useEffect } from 'react'
import styles from './homepage.module.scss';
import { PostModal } from '../../common/post-modal';
export const HomePage = (postID, authorID) => {
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
    console.log('123');
  }
  return (
      <div className={styles.container}>
        <h1>Latest posts</h1>
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

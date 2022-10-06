import React, { useEffect, useParams } from 'react'
import styles from './user.module.scss';
import { PostModal } from '../../common/post-modal';
export const User = () => {
  const { id } = useParams();
  let user = {
    role: 'user',
    email: 'user123@gmail.com',
    username: 'username',
    tag: 'userprikolist123',
    posts: [
      {
        header: 'Header 1',
        body: 'Some text for blog 1',
      },
      {
        header: 'Header 2',
        body: 'Some text for blog 2',
      },
      {
        header: 'Header 3',
        body: 'Some text for blog 3',
      }
    ],
  };
  const clicked = () => {
    //TODO redirect
    console.log('123');
  }
  useEffect(() => {
    // get from db
  });  
  return (
      <div className={styles.container}>
        <h1 className={styles.username}>{user.username}</h1>
        <h3 className={styles.tag}>@{user.tag}</h3>
        <hr />
        {
          user.posts.length > 0 ?
          (
            <div>
              <header className={styles.postsCount}>
                There are {user.posts.length} posts from {user.username}:
              </header>
              {user.posts.map((post, i) =>
                <PostModal key={i} header={post.header} body={post.body} onClick={clicked} />)}
            </div>
          )
          :
            <p className={styles.postsCount}>This user didn`t write any posts yet :(</p>
        }
      </div>
    )
}

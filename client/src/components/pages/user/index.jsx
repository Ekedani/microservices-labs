import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './user.module.scss';
import { PostModal } from '../../common/post-modal';
export const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  // let user = {
  //   role: 'user',
  //   email: 'user123@gmail.com',
  //   username: 'username',
  //   tag: 'userprikolist123',
  //   posts: [
  //     {
  //       header: 'Header 1',
  //       body: 'Some text for blog 1',
  //     },
  //     {
  //       header: 'Header 2',
  //       body: 'Some text for blog 2',
  //     },
  //     {
  //       header: 'Header 3',
  //       body: 'Some text for blog 3',
  //     }
  //   ],
  // };
  const openPost = () => {
    //TODO redirect
    console.log('123');
  }
  
  useEffect(() => {async function fetchUser () {
    const response = await axios.get(`/api/users/${id}`);
    setUser(response);
  } 
  });  
  return (
      <div className={styles.container}>
        <h1 className={styles.username}>{user.username}</h1>
        <h3 className={styles.tag}>@{user.tag} ({user.role})</h3>
        <hr />
        {
          user.posts.length > 0 ?
          (
            <div>
              {/* <header className={styles.postsCount}>
                There are {user.posts.length} posts from {user.username}:
              </header> */}
              {user.posts.map((post, i) =>
                <PostModal key={i} header={post.header} body={post.body} onClick={() => openPost(post.id)} />)}
            </div>
          )
          :
            <p className={styles.postsCount}>This user didn`t write any posts yet :(</p>
        }
      </div>
    )
}

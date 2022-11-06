import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './user.module.scss';
import { PostModal } from '../../common/post-modal';
export const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const openPost = () => {
    //TODO redirect
    console.log('123');
  }
  
  useEffect(() => {
    const fetchUser = async () => {
      await axios.get(`http://localhost:80/api/users/${id}`, {
        mode: 'no-cors',
      })
        .then(data => setUser(data));
    }
    fetchUser();
  }, []);

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

import React, { useEffect } from 'react'
import styles from './userspage.module.scss';
import { UserModal } from '../../common/user-modal';
export const UsersPage = () => {
  let users = [
    {
      username: 'User 1',
      tag: 'user1',
    },
    {
      username: 'User 2',
      tag: 'user2',
    },
    {
      username: 'User 3',
      tag: 'user3',
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
        <h1>List of users</h1>
        <hr />
        {
          users.length > 0 ?
          (
            <div>
              {users.map((user, i) =>
                <UserModal key={i}
                  username={user.username}
                  tag={user.tag}
                  onClick={clicked}
                />)}
            </div>
          )
          :
            <p className={styles.postsCount}>No one uses this blog :(</p>
        }
      </div>  
    )
}

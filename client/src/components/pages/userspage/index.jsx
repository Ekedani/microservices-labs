import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './userspage.module.scss';
import { UserModal } from '../../common/user-modal';
export const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {async function fetchUsers () {
      const res = await axios.get('/api/users');
      setUsers(res);
    }
  });
  const openUserInfo = async (userID) => {
    navigate(`/api/users/${userID}`);
  }
  const createNewUser = async () => {
    const tag = prompt('Enter your tag'),
      nickname = prompt('Enter your nickname'),
      role = prompt('Enter your role');
    const req = await JSON.stringify({
      tag,
      nickname,
      role,
    });
    await axios.post('/api/users', req);
  }
  return (
      <div className={styles.container}>
         <h1>List of users</h1>
        <div className={styles.newUser}>
          <h3>Not enough users?</h3>
          <button onClick={createNewUser}>Create</button>
        </div>
        
        <hr />
        {
          users.length > 0 ?
          (
            <div>
              {users.map((user, i) =>
                <UserModal key={i}
                  username={user.username}
                  tag={user.tag}
                  onClick={() => openUserInfo(user.id)}
                />)}
            </div>
          )
          :
            <p className={styles.postsCount}>No one uses this blog :(</p>
        }
      </div>  
    )
}

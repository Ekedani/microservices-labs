import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './userspage.module.scss';
import { UserModal } from '../../common/user-modal';
export const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
      const fetchUsers = async () => {
        await axios.get(`http://localhost:80/api/users`, {
          mode: 'no-cors',
        })
          .then(data => setUsers(data));
      }
      fetchUsers();
  }, []);

  const openUserInfo = async (userID) => {
    navigate(`/api/users/${userID}`);
  }
  
  return (
      <div className={styles.container}>
        <h1>List of the most active users</h1>
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

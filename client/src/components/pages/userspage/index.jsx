import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './userspage.module.scss';
import { UserModal } from '../../common/user-modal';
export const UsersPage = () => {
  const navigate = useNavigate();
  //const [users, setUsers] = useState([]);
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

  useEffect(() => {async function fetchUsers () {
      // const res = await axios.get('api/users');
      // setUsers(res);
    }
  });
  const openUserInfo = async (userID) => {
    navigate(`/api/users/${userID}`);
  }
  const createNewUser = async () => {
    const tag = prompt('Enter your tag'),
      nickname = prompt('Enter your nickname');
    const req = await JSON.stringify({
      tag,
      nickname,
    });
    await axios.post('/api/users', req);
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

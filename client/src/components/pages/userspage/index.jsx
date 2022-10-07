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
      // const res = await axios.get('users');
      // setUsers(res);
    }
  });
  const openUserInfo = async (userID) => {
    navigate(`/users/${userID}`);
  }
  const createNewUser = async () => {
    const tag = prompt('Enter your tag'),
      nickname = prompt('Enter your nickname');
    const req = await JSON.stringify({
      tag,
      nickname,
    });
    await axios.post('/users', req);
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

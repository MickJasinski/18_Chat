import React from 'react';

import styles from './css/UsersList.css';

// Presentation component for UsersList.
const UsersList = props => (
  <div className={styles.Users}>
    <div className={styles.UsersOnline}>
      {// This displays the number of active users.
        props.users.length} people online
    </div>
    <ul className={styles.UsersList}>
      {
        // Using 'map()' method to display user name within UserItem on UserList.
        props.users.map((user) => {
          return (
            <li key={user.id} className={styles.UserItem}>
              {user.name}
            </li>
          );
        })
      }
    </ul>
  </div>
);

export default UsersList;
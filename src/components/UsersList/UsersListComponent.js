
import User from "../UserComponent/UserComponent";
import config from "../../constants"
import styles from "./UsersListComponent.module.css";

const UsersList = (props) => {

  const { users,deleteUser,editUser,saveUser } = props;

  let fillRows = [];
  for(let i=users.filter( user=>user.show).length;i<config.PAGE_SIZE;i++){
      fillRows.push(<tr key={i}></tr>)
  }
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th><input type="checkbox" name="selectAll"/></th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return user.show?<User saveUser={saveUser} editUser={editUser} deleteUser={deleteUser} key={user.id} user={user}></User>:"";
        })}
        {fillRows}
      </tbody>
    </table>
  );
};

export default UsersList;

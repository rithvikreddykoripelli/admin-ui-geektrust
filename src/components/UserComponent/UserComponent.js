import styles from "./UserComponent.module.css";
import {useRef} from "react";

const User = (props) => {
  const { user, deleteUser, editUser, saveUser } = props;

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);


  return (
    // <tr key={user.id} onClick={()=>alert(`clicked ${user.id}`)}>
    user.edit ? (
      <tr key={user.id}>
        <td>
          <input type="checkbox"></input>
        </td>
        <td><input type="text" ref={nameRef} name="name" defaultValue={user.name}></input></td>
        <td><input type="email" ref={emailRef} name="email" defaultValue={user.email}/></td>
        <td><input type="text" ref={roleRef} name="role" defaultValue={user.role}/></td>
        <td className={styles.icons}>
          <i onClick={() => saveUser(user.id,nameRef,emailRef,roleRef)} className="fas fa-save"></i>
          <i
            onClick={() => deleteUser(user.id)}
            className="fas fa-trash-alt"
          ></i>
        </td>
      </tr>
    ) : (
      <tr key={user.id}>
        <td>
          <input type="checkbox"></input>
        </td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td className={styles.icons}>
          <i onClick={() => editUser(user.id)} className="fas fa-edit"></i>
          <i
            onClick={() => deleteUser(user.id)}
            className="fas fa-trash-alt"
          ></i>
        </td>
      </tr>
    )
  );
};

export default User;

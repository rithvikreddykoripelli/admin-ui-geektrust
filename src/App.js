import React, {useState,useEffect} from "react";

import './App.css';
import Pagination from "./components/Pagination/PaginationComponent";
import UsersList from './components/UsersList/UsersListComponent';
import config from "./constants";
import { getUsers } from "./services/UserService";
import { getRecordIndex } from "./utilities/PagingUtility";
import { searchInUsers } from "./utilities/SearchUtility";

function App() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [update, setUpdate] = useState(false)
  const [page, setPage] = useState(1);
  useEffect(()=> {
    getUsers(setUsers);
  },[])

  const searchUsers = (e) => {
    setSearch(e.target.value);
    setPage(1);
    setUsers(searchInUsers(e.target.value, users));
  }

  const deleteUser = (id)=> {
    let tempUsers = users.filter(user=> user.id !== id);
    setUsers(tempUsers);
    setUpdate(prevState=> !prevState)
  }

  const editUser = (id)=> {
    let tempUsers = users;
    let index = tempUsers.findIndex(user=> user.id === id)
    tempUsers[index].edit = true;
    setUsers(tempUsers) ;
    setUpdate(prevState=> !prevState)
  }

  const saveUser = (id,nameRef,emailRef,roleRef)=> {
    let tempUsers = users;
    let index = tempUsers.findIndex(user=> user.id === id)
    tempUsers[index].name = nameRef.current.value;
    tempUsers[index].email = emailRef.current.value;
    tempUsers[index].role = roleRef.current.value;
    tempUsers[index].edit = false;
    setUsers(tempUsers) ;
    setUpdate(prevState=> !prevState)
  }


  const index = getRecordIndex(page)
  return (
    <div className="App">
      <input className="search" type="text" placeholder="Search by name,email or role" onChange={searchUsers}></input>
      <UsersList saveUser={saveUser} editUser={editUser} deleteUser={deleteUser} users={users.filter(user=>user.show).slice(index,index + config.PAGE_SIZE)}></UsersList>
      <Pagination usersLength={users.filter(user=>user.show).length} page={page} setPage={setPage}></Pagination>
    </div>
  );
}

export default App;

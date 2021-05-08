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
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [update, setUpdate] = useState(false)
  const [page, setPage] = useState(1);
  useEffect(()=> {
    getUsers(setUsers,setSearchedUsers);
  },[])

  const searchUsers = (e) => {
    setSearch(e.target.value);
    setPage(1);
    setSearchedUsers(searchInUsers(e.target.value, users));
  }


  const deleteUser = (id)=> {
    let tempUsers = users.filter(user=> user.id !== id);
    setUsers(tempUsers);
    setSearchedUsers(tempUsers);
  }

  const editUser = (id)=> {
    let tempUsers = users;
    tempUsers[id-1].edit = true;
    setUsers(tempUsers) ;
    setSearchedUsers(tempUsers);
    setUpdate(prevState=> !prevState)
  }

  const saveUser = (id,nameRef,emailRef,roleRef)=> {
    let tempUsers = users;
    tempUsers[id-1].name = nameRef.current.value;
    tempUsers[id-1].email = emailRef.current.value;
    tempUsers[id-1].role = roleRef.current.value;
    tempUsers[id-1].edit = false;
    console.log(tempUsers[0]);
    setUsers(tempUsers) ;
    setSearchedUsers(tempUsers);
    setUpdate(prevState=> !prevState)
  }
  const index = getRecordIndex(page)
  return (
    <div className="App">
      <input className="search" type="text" placeholder="Search by name,email or role" onChange={searchUsers}></input>
      <UsersList saveUser={saveUser} editUser={editUser} deleteUser={deleteUser} users={searchedUsers.slice(index,index + config.PAGE_SIZE)}></UsersList>
      <Pagination usersLength={searchedUsers.length} page={page} setPage={setPage}></Pagination>
    </div>
  );
}

export default App;

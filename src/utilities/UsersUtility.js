


export const processUsersResponse = (users)=> {
    return users.map(user => {
        user.selected = false;
        user.edit = false;
        return user;
    })
} 
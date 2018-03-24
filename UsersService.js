// Class for constructor and user processing methods.
class UsersService {
  // Array to add active users to.
  constructor() {
    this.users = [];
  }

  // This returns users added to array.
  getAllUsers() {
    return this.users;
  }

  // This finds user by ID using arrow function 'find(). 
  getUserById(userId) {
    return this.users.find(user => user.id === userId);
  }

  // This adds new users to the list.
  addUser(user) {
    this.users = [user, ...this.users];
  }

  // This using function 'filter()' is filering ID's of users that are not added to array.
  removeUser(userId) {
    this.users = this.users.filter(user => user.id !== userId);
  }
}
module.exports = UsersService;
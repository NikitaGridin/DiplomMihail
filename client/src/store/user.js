import {makeAutoObservable} from 'mobx'

class User {
    isAuth = false;
    user = [];
    role = '';
    constructor() {
        makeAutoObservable(this)
    }

    setUser(user) {
        this.isAuth = true;
        this.user = user;
    }
    setRole(role){
        this.role = role;
    }
    logout() {
        this.isAuth = false;
   }
}

export default new User()
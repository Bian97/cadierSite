import { LOGIN, LOGOUT } from "../actions/UserActions";

const user = (state = { isLoggedIn: false, username: "", password: "" }, action) => {
    switch (action.type) {
      case LOGIN:
        return {
          isLoggedIn: true,
          username: action.payload,
        };
      case LOGOUT:
        return {
          isLoggedIn: false,
          username: "",
        };
      default:
        return state;
    }
  };
  
  export default user;
import { connect } from "react-redux";
import { signUp, signIn, logOut } from "../../redux/loginReducer";
import { AppState } from "../../redux/store";
import Header from "./Header";

let mapStateToProps = (state: AppState) => {
    return {
        isAuthorized: state.login.isAuthorized
    }
}

let HeaderContainer = connect(mapStateToProps, {signUp, signIn, logOut})(Header);

export default HeaderContainer;
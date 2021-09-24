import { connect } from "react-redux";
import { signUp, signIn, logOut, loginActions } from "../../redux/loginReducer";
import { AppState } from "../../redux/store";
import Header from "./Header";

let mapStateToProps = (state: AppState) => {
    return {
        isAuthorized: state.login.isAuthorized,
        errors: state.login.errors
    }
}

let HeaderContainer = connect(mapStateToProps, {clearErrors: loginActions.clearErrors, signUp, signIn, logOut})(Header);

export default HeaderContainer;
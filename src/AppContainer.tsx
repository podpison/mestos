import { connect } from "react-redux";
import App from "./App";
import { AppState } from "./redux/store";
import { initializeUser } from "./redux/loginReducer";

let mapStateToProps = (state: AppState) => {
    return {

    }
}

let AppContainer = connect(mapStateToProps, {initializeUser})(App);

export default AppContainer;
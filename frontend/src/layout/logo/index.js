import React from "react";
import LogoLight2x from "../../images/limitless/logo2x.png";
import LogoDark2x from "../../images/limitless/logo-dark2x.png";
import LogoSmall from "../../images/limitless/logo-small.png";
import {Link} from "react-router-dom";
import {APICore} from "../../utils/api/APICore";

const Logo = () => {
    const api = new APICore()
    const user = api.getLoggedInUser();
    const redirectUrl = () => {
        switch (user.role) {
            case '1':
                return process.env.PUBLIC_URL + '/administrator'
            default:
                return process.env.PUBLIC_URL + '/'
        }
    }
    return (
        <Link to={redirectUrl()} className="logo-link">
            <img className="logo-light logo-img" src={LogoLight2x} alt="logo"/>
            <img className="logo-dark logo-img" src={LogoDark2x} alt="logo"/>
            <img className="logo-small logo-img logo-img-small" src={LogoSmall} alt="logo"/>
        </Link>
    );
};

export default Logo;

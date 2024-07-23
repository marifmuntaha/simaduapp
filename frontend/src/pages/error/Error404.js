import React from "react";
import ErrorImage from "../../images/gfx/error-404.svg";
import {Link} from "react-router-dom";
import {Block, BlockContent, Button} from "../../components";
import {APICore} from "../../utils/api/APICore";

const Error404 = () => {
    const api = new APICore();
    const user = api.getLoggedInUser();
    const redirectUrl = () => {
        switch (user.role) {
            case '1':
                return process.env.PUBLIC_URL + '/administrator'
            case '5':
                return process.env.PUBLIC_URL + '/operator'
            default:
                return process.env.PUBLIC_URL + '/'
        }
    }
    return (
        <>
            <Block className="nk-block-middle wide-md mx-auto">
                <BlockContent className="nk-error-ld text-center">
                    <img className="nk-error-gfx" src={ErrorImage} alt="error"/>
                    <div className="wide-xs mx-auto">
                        <h3 className="nk-error-title">Oops! Why you’re here?</h3>
                        <p className="nk-error-text">
                            We are very sorry for inconvenience. It looks like you’re try to access a page that either
                            has been
                            deleted or never existed.
                        </p>
                        <Link to={redirectUrl()}>
                            <Button color="primary" size="lg" className="mt-2">
                                Kembali ke Dashboard
                            </Button>
                        </Link>
                    </div>
                </BlockContent>
            </Block>
        </>
    );
};
export default Error404;

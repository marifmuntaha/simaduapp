import React from "react";
import Head from "../../layout/head";
import Content from "../../layout/content";
import {
    Block,
    BlockDes,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    PreviewCard
} from "../../components";
import {Step, Steps} from "react-step-builder";
import Personal from "./Personal";
import {ToastContainer} from "react-toastify";
import Program from "./Program";
import Parent from "./Parent";
const Registrant = () => {
    const Header = (props) => {
        return (
            <div className="steps clearfix">
                <ul>
                    <li className={props.current >= 1 ? "first done" : "first"}>
                        <a href="#data-pribadi" onClick={(ev) => ev.preventDefault()}>
                            <span className="number">01</span> <h5>Data Pribadi</h5>
                        </a>
                    </li>
                    <li className={props.current >= 2 ? "done" : ""}>
                        <a href="#program-pilihan" onClick={(ev) => ev.preventDefault()}>
                            <span className="number">02</span> <h5>Program Pilihan</h5>
                        </a>
                    </li>
                    <li className={props.current >= 3 ? "done" : ""}>
                        <a href="#data-orangtua" onClick={(ev) => ev.preventDefault()}>
                            <span className="current-info audible">current step: </span>
                            <span className="number">03</span> <h5>Data Orangtua</h5>
                        </a>
                    </li>
                    <li className={props.current === 4 ? "done" : ""}>
                        <a href="#data-bantuan" onClick={(ev) => ev.preventDefault()}>
                            <span className="current-info audible">current step: </span>
                            <span className="number">04</span> <h5>Data Bantuan</h5>
                        </a>
                    </li>
                    <li className={props.current === 5 ? "last done" : "last"}>
                        <a href="#sekolah-asal" onClick={(ev) => ev.preventDefault()}>
                            <span className="current-info audible">current step: </span>
                            <span className="number">05</span> <h5>Sekolah Asal</h5>
                        </a>
                    </li>
                </ul>
            </div>
        );
    };
    const config = {
        before: Header,
    };
    return <>
        <Head title="Data Pendaftar"/>
        <Content page="component">
            <BlockHead size="lg" wide="sm">
                <BlockHeadContent>
                    <BlockTitle tag="h2" className="fw-normal">
                        Data Pendaftar
                    </BlockTitle>
                    <BlockDes>
                        <p className="lead">
                            Toggle the visibility of content across your project with a few classes and Bootstrap collapse
                            JavaScript plugins. The collapse plugin is used to show &amp; hide content.
                        </p>
                    </BlockDes>
                </BlockHeadContent>
            </BlockHead>
            <Block size="lg">
                <PreviewCard>
                    <div className="nk-wizard nk-wizard-simple is-alter wizard clearfix">
                        <Steps config={config}>
                            <Step component={Personal} />
                            <Step component={Program} />
                            <Step component={Parent} />
                            {/*<Step component={Success} />*/}
                        </Steps>
                    </div>
                </PreviewCard>
            </Block>
        </Content>
        <ToastContainer/>
    </>
}
export default Registrant
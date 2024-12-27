import React, { useState } from "react";
import { Modal } from "reactstrap";
import Icon from "../../icon";

const ImageContainer = ({ img, icon }) => {
    const [open, setOpen] = useState(false);
    const toggle = () => {
        setOpen(!open);
    };
    return (
        <a
            className="nk-menu-link"
            onClick={(ev) => {
                ev.preventDefault();
                toggle();
            }}
            href="#gallery"
        >
            <span className="nk-menu-icon">
                <Icon name={icon}/>
            </span>
            <Modal isOpen={open} toggle={toggle} size="large">
                <button type="button" className="mfp-close" onClick={toggle}>
                    ×
                </button>
                <img className="w-100 rounded-top" style={{ height: "100%" }} src={img} alt="" />
            </Modal>
        </a>
    );
};

export default ImageContainer;

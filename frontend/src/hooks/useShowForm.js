import { useState } from "react";

export const useShowForm = () => {
    const [show, setShow] = useState(false);

    const open = () => {
        setShow(true)
    };

    const close = () => {
        setShow(false);
    }

    const toogle = () => {
        setShow(!show);
    }

    return {
        open, close, toogle, show
    }
}
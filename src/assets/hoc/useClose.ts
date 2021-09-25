import { useRef, useEffect } from 'react';

export let useClose = (isClose: boolean, closeFunction: Function, dependencies: string | number | Object) => {
    let isMounted = useRef(false);
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
        } else {
            isClose && closeFunction()
        };
        //eslint-disable-next-line
    }, [dependencies]);
};
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

const DEFAULT_SIZES = {
    small: 1366,
    medium: 1400,
    large: 1920,
    tablet: 768,
    mobile: 425,
};

const useResponsiveWindow = (sizes = DEFAULT_SIZES) => {
    const [width, setWidth] = useState(window.innerWidth);

    const handleWindowResize = useCallback(
        (e) => {
            setWidth(e.target.innerWidth);
        },
        [setWidth]
    );

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [width, handleWindowResize]);

    const isMobile = useMemo(
        () => sizes?.mobile && width <= sizes?.mobile,
        [width]
    );
    const isTablet = useMemo(
        () => sizes?.tablet && width <= sizes?.tablet,
        [width]
    );

    return {
        width,
        isMobile,
        isTablet,
    };
};

export default useResponsiveWindow;

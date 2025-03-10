import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// pathname→パスベースのルーティング（例：http://localhost:3000/cryptids/missie）に対応
// search→クエリパラメータのルーティング（例：http://localhost:3000/cryptids?area=3&page=1）に対応
const ScrollToTop = () => {
    const { pathname, search } = useLocation(); 

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname, search]);

    return null;
};

export default ScrollToTop;

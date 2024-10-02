import { useEffect } from "react";

export const DEFAULT_TITLE = 'Дистанційний звязок';

const useDocumentTitle = (title) => {
    useEffect(() => {
        document.title = title || DEFAULT_TITLE;
    }, [title]);
};

export default useDocumentTitle;
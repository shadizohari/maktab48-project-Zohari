
import { useSelector } from 'react-redux';
import Loading from "./Loading"
export default function Layout({ children }) {
    const isLoadingObj = useSelector((store) => store.isLoading);
    const { isLoading } = isLoadingObj;
    return (
        <div>
            {(isLoading) ? <Loading /> : children}
        </div>
    )
}

// LoadingLayout
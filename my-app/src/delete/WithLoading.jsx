import Api from './Api'
import Loading from './Loading'

function WithLoading(WrappedComponent, method, url, username, password) {
    function WithLoadingComponent({ ...props }) {
        const [res, setRes] = useState(null);
        const [isLoading, setLoading] = useState(true);


        setRes(Api(method, url, username, password))


        useEffect(() => {
            if (res) {
                // setLoading(false);
                history.push("/Admin-panel/Ware-Management")

                console.log(res)
                res.then((x) => {
                    console.log(x.data);
                    if (x.data.token) {
                        console.log(x.data.token)
                        localStorage.setItem("token", x.data.token);
                        setLoading(false);
                        // dispatch(setTokenAdmin(x.data.token))
                    }
                })

            }
        }, [res])
        return (
            (isLoading) ? <Loading /> : <WrappedComponent data={res} {...props} />
        )
    }
    return WithLoadingComponent;
}
export default WithLoading;
import BarLoader from "react-spinners/BarLoader";

const Spinner = () => {
    return (
        <>
            <BarLoader color="#d63636" width='100%' height='20px' />
            <h3>Завантаження даних...</h3>
        </>
    )
}
export default Spinner
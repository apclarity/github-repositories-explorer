import "../../styles/loader.css"

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="spinner" data-testid="loader"/>
        </div>
    );
};

export default Loader;
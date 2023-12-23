import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="App-footer">
            <div>
                <Link
                    to="/"
                    className="btn btn-primary mx-4"
                >
                    Back
                </Link>
            </div>
            <div>
                <span>&copy; 2023 MathMate. All rights reserved.</span>
            </div>
        </footer>


    )

}

export default Footer

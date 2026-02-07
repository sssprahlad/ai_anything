import "./SignIn.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../../../Constants/Constants";
import SnackbarPopup from "../../../Constants/Snackbar";
import { useContext } from "react";
import { UserContext } from "../../../Context/Context";

const SignIn = () => {
    const [signInData, setSignInData] = useState({
        email: "",
        password: ""
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { userId, setUserId } = useContext(UserContext);

    const handleChange = (e) => {
        setSignInData({
            ...signInData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(signInData);

        try {
            setLoading(true);
            const response = await fetch(LOGIN_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signInData),
                credentials: "include"
            });

            const data = await response.json();
            console.log(data, "login data");
            localStorage.setItem("token", data?.token);
            localStorage.setItem("userId", data?.user?.id);
            setUserId(data?.user?.id)
            if (data.status === 200 || data.status === 201) {
                 setSnackbar({
                open: true,
                message: data.message,
                severity: 'success'
            });
            setTimeout(() => {
                navigate("/");
            }, 2000);
            }else{
                setSnackbar({
                    open: true,
                    message: data.message,
                    severity: 'error'
                });
            }
            setLoading(false);           
        } catch (error) {
            console.log(error);
                setSnackbar({
                open: true,
                message: error.message,
                severity: 'error'
            });
            setLoading(false);
        }


    };

    return (
        <div className="sign-in-form-container">
            <div className="form-container">
            <form className="sign-in-container" onSubmit={handleSubmit}>
                <div style={{textAlign: "center"}}>
                <img src="https://www.anything.ai/_next/image?url=%2Flogo.jpeg&w=48&q=75" alt="Anything AI Logo" height={50} width={50} style={{borderRadius: "50%"}} />
                </div>
                <h1 className="sign-in-title">Sign In</h1>
                <p className="sign-in-subtitle">Welcome back! Please sign in to continue.</p>
                <div className="sign-in-form">
                    <label htmlFor="email" className="sign-in-label">Email</label>
                    <input id="email" placeholder="Enter your email" className="sign-in-input" type="email" name="email" onChange={handleChange} required />
                </div>
                <div className="sign-in-form">
                    <label htmlFor="password" className="sign-in-label">Password</label>
                    <input id="password" placeholder="Enter your password" className="sign-in-input" type="password" name="password" onChange={handleChange} required />
                </div>
                <button type="submit" className="sign-in-button">{loading ? <div className="spinner" style={{width: "30px", height: "30px"}}></div> : "Sign In"}</button>
            </form>
            <div className="dont-have-account-container">
                    <p>Don't have an account? <button className="sing-up-btn" onClick={() => navigate("/sign-up")}> Sign Up</button></p>
                </div>
            </div>
            <SnackbarPopup open={snackbar.open} message={snackbar.message} severity={snackbar.severity} setSnackbar={setSnackbar} />
            {/* {loading && <div className="loading-container">
                <div className="spinner"></div>
            </div>} */}
        </div>
    )
}

export default SignIn
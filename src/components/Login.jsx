import React, { useState } from "react";

export default function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        username: false,
        password: false,
    });

    // Change statusMessage to an object to store messages for each field
    const [statusMessages, setStatusMessages] = useState({
        username: "",
        password: "",
        general: "",
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container-fluid">
            <section id="contactsect">
                <div data-bs-offset="0">
                    <h4 id="contact-title">Login</h4>
                    <form>
                        <div id="contactform">                            
                            <label className="geninput" htmlFor="username">Username
                                <span className={errors.username ? "required" : ""}>*</span>
                            </label>
                            <input
                                type="text"
                                id="inputusername"
                                name="username"
                                placeholder="JaneDoe123"
                                value={formData.username}
                                onChange={handleChange}
                                className={
                                    errors.username
                                        ? "error-border"
                                        : formData.username
                                            ? "good-border"
                                            : ""
                                }
                                required
                            />
                            {statusMessages.username && <p className="statusmsg"><i>{statusMessages.username}</i></p>}

                            <label className="geninput" htmlFor="password">Password
                                <span className={errors.username ? "required" : ""}>*</span>
                            </label>
                            <input
                                type="text"
                                id="inputpassword"
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                className={
                                    errors.password
                                        ? "error-border"
                                        : formData.password
                                            ? "good-border"
                                            : ""
                                }
                            />
                            {statusMessages.password && <p className="statusmsg"><i>{statusMessages.password}</i></p>}

                            <div className="submitbtn">
                                <button type="submit" className="btn btn-outline-primary">Login</button>
                            </div>
                            {statusMessages.general && <p className="statusmsg"><i>{statusMessages.general}</i></p>}
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

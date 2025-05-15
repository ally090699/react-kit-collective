import React, { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        status: "",
        productID: "",
        message: "",
    });

    const [errors, setErrors] = useState({
        name: false,
        phone: false,
        email: false,
        productID: false,
        message: false,
    });

    // Change statusMessage to an object to store messages for each field
    const [statusMessages, setStatusMessages] = useState({
        name: "",
        phone: "",
        email: "",
        productID: "",
        message: "",
    });

    const checkName = (name) => {
        const isValid = name.length >= 4 && /^[A-Za-z]+(\s[A-Za-z]+)*$/.test(name);
        setErrors((prev) => ({
            ...prev,
            name: !isValid,
        }));

        setStatusMessages((prev) => ({
            ...prev,
            name: !isValid
                ? "Name must be at least 4 characters long and contain only letters and spaces."
                : "",
        }));
    };

    const checkPhone = (phone) => {
        const isValid = /^\d{3} \d{3} \d{4}$/.test(phone);
        setErrors((prev) => ({
            ...prev,
            phone: !isValid,
        }));

        setStatusMessages((prev) => ({
            ...prev,
            phone: !isValid ? "Phone number must be in the format: 888 888 8888." : "",
        }));
    };

    const checkEmail = (email) => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        setErrors((prev) => ({
            ...prev,
            email: !isValid,
        }));

        setStatusMessages((prev) => ({
            ...prev,
            email: !isValid ? "Please enter a valid email address." : "",
        }));
    };

    const checkProductID = (productID) => {
        const productCodes = ["SS101", "AA101", "SS102", "PS101"];
        const isValid = productCodes.includes(productID);
        setErrors((prev) => ({
            ...prev,
            productID: !isValid,
        }));

        setStatusMessages((prev) => ({
            ...prev,
            productID: !isValid
                ? "Invalid product ID. Please enter a valid product ID."
                : "",
        }));
    };

    const checkMessage = (message) => {
        const isValid = message.length >= 10 && message.length <= 300;
        setErrors((prev) => ({
            ...prev,
            message: !isValid,
        }));

        setStatusMessages((prev) => ({
            ...prev,
            message: !isValid ? "Message must be between 10 and 300 characters." : "",
        }));
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Call validation dynamically
        if (name === "name") checkName(value);
        if (name === "phone") checkPhone(value);
        if (name === "email") checkEmail(value);
        if (name === "productID") checkProductID(value);
        if (name === "message") checkMessage(value);
    };

    // Handle radio button selection
    const handleRadioChange = (e) => {
        e.persist();
        setFormData((prev) => ({ ...prev, status: e.target.id }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Run validation checks before submission
        checkName(formData.name);
        checkEmail(formData.email);
        checkMessage(formData.message);
        if (formData.status === "productinfo") {
            checkProductID(formData.productID);
        }
    
        // Check if any errors exist
        const hasErrors = Object.values(errors).some((error) => error);
    
        if (hasErrors) {
            setStatusMessages((prev) => ({
                ...prev,
                general: "Please fix the errors before submitting.",
            }));
            return;
        }
    
        try {
            // const backendUrl = "https://kit-collective.onrender.com";

            // const response = await fetch(`${backendUrl}/submit`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData),
            // });
    
            // if (response.ok) {
            //     // Parse the JSON response from the server
            //     const data = await response.json();
            //     console.log(data.message);  // Logs: 'Form submitted successfully!'
    
            //     // Handle success (e.g., show a success message, reset form)
            //     setFormData({
            //         name: "",
            //         phone: "",
            //         email: "",
            //         status: "",
            //         productID: "",
            //         message: "",
            //     });
            //     setStatusMessages((prev) => ({
            //         ...prev,
            //         general: "Form submitted successfully!",
            //     }));
            // } else {
            //     console.error('Form submission failed:', response.statusText);
            //     setStatusMessages((prev) => ({
            //         ...prev,
            //         general: "There was an issue submitting the form. Please try again.",
            //     }));
            // }
        } catch (error) {
            console.error('Error:', error);
            setStatusMessages((prev) => ({
                ...prev,
                general: "There was an error submitting the form. Please try again later.",
            }));
        }
    };
    
    

    return (
        <div className="container-fluid">
            <section id="contactsect">
                <div data-bs-offset="0">
                    <h4 id="contact-title"><span role="img" aria-label="Phone emoji">📞</span> Contact Us</h4>
                    <form onSubmit={handleSubmit}>
                        <div id="contactform">
                            <h6 className="geninfo">General Information</h6>
                            
                            <label className="geninput" htmlFor="name">Name
                                <span className={errors.name ? "required" : ""}>*</span>
                            </label>
                            <input
                                type="text"
                                id="inputname"
                                name="name"
                                placeholder="Jane Doe"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={() => checkName(formData.name)}
                                className={
                                    errors.name
                                        ? "error-border"
                                        : formData.name
                                            ? "good-border"
                                            : ""
                                }
                                required
                            />
                            {statusMessages.name && <p className="statusmsg"><i>{statusMessages.name}</i></p>}

                            <label className="geninput" htmlFor="phone">Phone Number</label>
                            <input
                                type="text"
                                id="inputphone"
                                name="phone"
                                placeholder="888 888 8888"
                                value={formData.phone}
                                onChange={handleChange}
                                onBlur={() => checkPhone(formData.phone)}
                                className={
                                    errors.phone
                                        ? "error-border"
                                        : formData.phone
                                            ? "good-border"
                                            : ""
                                }
                            />
                            {statusMessages.phone && <p className="statusmsg"><i>{statusMessages.phone}</i></p>}

                            <label className="geninput" htmlFor="email">Email
                                <span className={errors.email ? "required" : ""}>*</span>
                            </label>
                            <input
                                type="email"
                                id="inputemail"
                                name="email"
                                placeholder="janedoe123@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={() => checkEmail(formData.email)}
                                className={
                                    errors.email
                                        ? "error-border"
                                        : formData.email
                                            ? "good-border"
                                            : ""
                                }
                                required
                            />
                            {statusMessages.email && <p className="statusmsg"><i>{statusMessages.email}</i></p>}

                            <h6 className="msgreason">Reason for Message</h6>
                            {["General Inquiry", "Pricing", "Product Info", "Shipping", "Other"].map((label) => {
                                const id = label.toLowerCase().replace(/\s+/g, '');
                                return (
                                    <div className="msgR" key={id}>
                                        <input
                                            type="radio"
                                            name="status"
                                            id={id}
                                            onChange={handleRadioChange}
                                            checked={formData.status === id}
                                            className="radiobtn"
                                        />
                                        <label htmlFor={id}> {label}</label>
                                    </div>
                                );
                            })}

                            {formData.status === "productinfo" && (
                                <div className="pid">
                                    <label htmlFor="productnum"> Product ID
                                        <span className={errors.productID ? "required" : ""}>*</span>
                                    </label><br />
                                    <input
                                        type="text"
                                        id="productnum"
                                        name="productID"
                                        value={formData.productID}
                                        onChange={handleChange}
                                        onBlur={() => checkProductID(formData.productID)}
                                        className={
                                            errors.productID
                                                ? "error-border"
                                                : formData.productID
                                                    ? "good-border"
                                                    : ""
                                        }
                                    />
                                </div>
                            )}
                            {statusMessages.productID && <p className="statusmsg"><i>{statusMessages.productID}</i></p>}

                            <label htmlFor="msg" className="msg">Message
                                <span className={errors.message ? "required" : ""}>*</span>
                            </label>
                            <textarea
                                id="inputMessage"
                                name="message"
                                placeholder="Enter message here ..."
                                value={formData.message}
                                onChange={handleChange}
                                onBlur={() => checkMessage(formData.message)}
                                className={
                                    errors.message
                                        ? "error-border"
                                        : formData.message
                                            ? "good-border"
                                            : ""
                                }
                                required
                            ></textarea>
                            {statusMessages.message && <p className="statusmsg"><i>{statusMessages.message}</i></p>}

                            <div className="submitbtn">
                                <button type="submit" className="btn btn-outline-primary">Send</button>
                            </div>
                            {statusMessages.general && <p className="statusmsg"><i>{statusMessages.general}</i></p>}
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

import './Contact.css';

const Contact = () => {
return (
<div className="contact-container">
    <h1>Contact Us</h1>

    <div className="contact-content">
    <div className="contact-info">
        <h2>Get in Touch</h2>
        <p>We’d love to hear from you! Reach out any time and we’ll get back to you as soon as we can.</p>

        <ul>
        <li><strong>Phone:</strong> <a href="tel:+1234567890">91+ 8247733797</a></li>
        <li><strong>Email:</strong> <a href="mailto:support@mystore.com">surabhishankar577@gmail.com</a></li>
        <li><strong>Address:</strong>Main road, PIDUGURALLA, PALNADU, A.P , IND</li>
        <li><strong>Business Hours:</strong> Mon-Fri, 9am - 6pm</li>
        </ul>
    </div>
    <form className="contact-form">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Your name" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Your email" required />

        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" placeholder="Your message" rows="5" required></textarea>

        <button type="submit" className="submit-button">Send Message</button>
    </form>
    </div>
</div>
);
};

export default Contact;

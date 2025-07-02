import './About.css';

const About = () => {
return (
<div className="about-container">
    <h1>About MyStore</h1>

    <section className="about-section">
    <h2>Our Mission</h2>
    <p>
        At MyStore, our mission is to provide high-quality products at competitive prices,
        paired with an exceptional shopping experience. We believe in making online shopping
        easy, enjoyable, and accessible for everyone.
    </p>
    <p>
        We are committed to sourcing products responsibly and ensuring that our customers
        receive the best value and service.
    </p>
    </section>

    <section className="about-section">
    <h2>Our Story</h2>
    <p>
        Founded in 2025, MyStore started as a small dream to create an online marketplace
        that truly puts customers first. From humble beginnings, we've grown into a thriving
        e-commerce platform, continually expanding our product range and improving our services.
    </p>
    <p>
        Every step of our journey has been driven by passion for retail and a dedication to
        our community of shoppers.
    </p>
    </section>

    <section className="about-section">
    <h2>Meet the Team</h2>
    <div className="team-members">
        <div className="member-card">
        {/* <img src="https://via.placeholder.com/100" alt="Team Member 1" /> */}
        <h3>SURABHI ESWAR</h3>
        <p>Founder & CEO</p>
        </div>
        <div className="member-card">
        {/* <img src="https://via.placeholder.com/100" alt="Team Member 2" /> */}
        <h3>SURABHI SHANKAR</h3>
        <p>Head of Operations</p>
        </div>
        {/* <div className="member-card"> */}
        {/* <img src="https://via.placeholder.com/100" alt="Team Member 3" /> */}
        {/* <h3>Emily White</h3>
        <p>Customer Experience Lead</p>
        </div> */}
    </div>
    </section>

    <section className="about-section">
    <h2>Our Values</h2>
    <ul>
        <li><strong>Customer Focus:</strong> Your satisfaction is our priority.</li>
        <li><strong>Integrity:</strong> We operate with honesty and transparency.</li>
        <li><strong>Quality:</strong> We offer products we believe in.</li>
        <li><strong>Innovation:</strong> Continuously improving your shopping journey.</li>
    </ul>
    </section>
</div>
);
};

export default About;

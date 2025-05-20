import React from 'react';
import './AboutUs.css';
import NavigBare from '../components/NavigBare';
import {
  FiAward,
  FiShield,
  FiFeather,
  FiTrendingUp,
  FiUsers,
  FiGlobe,
} from 'react-icons/fi';

const AboutUs = () => {
  return (
    <div className="premium-about-page">
      <NavigBare />

      <div className="premium-about-container">
        {/* Hero Section */}
        <header className="premium-about-hero">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="title-gradient">College-Born</span> Tech Shopping
            </h1>
            <p className="hero-subtitle">
              Created by two students passionate about tech and making great products accessible
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">2</span>
                <span className="stat-label">Student Founders</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">300+</span>
                <span className="stat-label">Products Listed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">2025</span>
                <span className="stat-label">Site Launched</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="premium-about-content">
          {/* Story Section */}
          <section className="story-section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="title-decoration">Our</span> Story
              </h2>
              <div className="section-divider"></div>
            </div>
            <div className="story-content">
              <div className="story-text">
                <p>
                  We’re Malak and Lina, two computer science students who were always helping friends find good tech deals. 
                  After seeing how overpriced or hard-to-find quality gear could be, we decided to build our own platform.
                </p>
                <p>
                  From a small dorm room idea, we developed our eCommerce site to connect students and tech lovers 
                  with reliable, affordable electronics — phones, laptops, accessories and more.
                </p>
                <div className="milestones">
                  <div className="milestone">
                    <div className="milestone-year">2024</div>
                    <div className="milestone-desc">Idea Sparked in Campus Lounge</div>
                  </div>
                  <div className="milestone">
                    <div className="milestone-year">2025</div>
                    <div className="milestone-desc">Platform Released</div>
                  </div>
                
                </div>
              </div>
              <div className="story-image">
                <img
                  src="https://images.unsplash.com/photo-1581091012184-5c8e96c60c9b?auto=format&fit=crop&w=1000&q=80"
                  alt="Students building project"
                />
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="values-section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="title-decoration">Our</span> Values
              </h2>
              <div className="section-divider"></div>
              <p className="section-intro">
                We're not just selling gadgets — we're building trust and community around quality tech
              </p>
            </div>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">
                  <FiTrendingUp className="icon" />
                </div>
                <h3>Affordability</h3>
                <p>
                  We offer competitive pricing and student discounts to make tech accessible to everyone.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <FiAward className="icon" />
                </div>
                <h3>Quality First</h3>
                <p>
                  Every product is vetted before going live — we only sell what we’d buy ourselves.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <FiFeather className="icon" />
                </div>
                <h3>Ease of Use</h3>
                <p>
                  We’ve designed our platform to be as intuitive and smooth as possible for busy students and tech fans.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <FiShield className="icon" />
                </div>
                <h3>Security</h3>
                <p>
                  From checkout to customer data, we use secure practices to protect your information.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <FiUsers className="icon" />
                </div>
                <h3>Student-Focused</h3>
                <p>
                  Our core audience is students — we know your needs and we build for them.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <FiGlobe className="icon" />
                </div>
                <h3>Growing Together</h3>
                <p>
                  As we grow, we stay committed to our roots and continue improving based on feedback.
                </p>
              </div>
            </div>
          </section>

          {/* Leadership Section */}
          <section className="leadership-section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="title-decoration">Founders'</span> Corner
              </h2>
              <div className="section-divider"></div>
              <p className="section-intro">
                Meet the students behind the screen making tech shopping easier for everyone
              </p>
            </div>
            <div className="executive-team">
              <div className="executive-card">
                <div className="executive-photo">
                  <img
                    src="https://images.unsplash.com/photo-1590080876394-3f70d33b84b6?auto=format&fit=crop&w=334&q=80"
                    alt="Omar"
                  />
                </div>
                <div className="executive-info">
                  <h3>Malak Ifiss</h3>
                  <p className="position">Tech Lead & Co-Founder</p>
                  <p className="bio">
                    Full-stack developer and hardware geek. Handles backend, product listings, and deployment.
                  </p>
                </div>
              </div>
              <div className="executive-card">
                <div className="executive-photo">
                  <img
                    src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=334&q=80"
                    alt="Lina"
                  />
                </div>
                <div className="executive-info">
                  <h3>Lina Hannouni</h3>
                  <p className="position">UI/UX & Co-Founder</p>
                  <p className="bio">
                    Manages the front-end, product visuals, and user experience with a passion for design and simplicity.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer CTA */}
        <section className="premium-cta-section">
          <div className="cta-content">
            <h2>Support a Student-Run Store</h2>
            <p>
              Every purchase helps us grow this dream — thank you for being part of the journey!
            </p>
            <div className="cta-buttons">
              <button className="primary-cta">
                Browse Tech Deals
              </button>
            </div>
          </div>
        </section>
        <footer className="premium-contact-footer">
  <div className="premium-about-container">
    <h2 className="contact-title">Get in Touch</h2>
    <p className="contact-subtitle">
      Have a question, collaboration idea, or just want to say hi? We'd love to hear from you.
    </p>
    <div className="contact-methods">
      <p><strong>Email:</strong> <a href="mailto:support@techduo.shop">support@techduo.shop</a></p>
      <p><strong>Instagram:</strong> <a href="https://instagram.com/techduo_store" target="_blank">@techduo_store</a></p>
      <p><strong>Phone:</strong> +1 (555) 123-4567</p>
    </div>
    <div className="footer-note">© {new Date().getFullYear()} TechDuo — Crafted with passion by two college founders.</div>
  </div>
</footer>

        
      </div>
    </div>
  );
};

export default AboutUs;

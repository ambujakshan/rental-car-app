import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

const fallbackImage =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80";

export default function HomePage() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const loadCars = async () => {
      try {
        const res = await API.get("/cars/available");
        setCars(res.data);
      } catch (error) {
        setCars([]);
      }
    };

    loadCars();
  }, []);

  return (
    <div className="public-site">
      <header className="public-hero">
        <nav className="public-nav">
          <div className="public-nav__brand">DriveDesk Rentals</div>
          <div className="public-nav__links">
            <a href="#fleet">Fleet</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <Link to="/login" className="public-nav__button">Admin Login</Link>
          </div>
        </nav>

        <div className="public-hero__content">
          <div className="public-hero__copy">
            <p className="eyebrow">Premium city rentals</p>
            <h1>Find your next rental car with confidence.</h1>
            <p>
              Browse reliable vehicles for business trips, airport pickups, and family
              travel. We keep pricing clear, booking support responsive, and our fleet
              ready to drive.
            </p>
            <div className="public-hero__actions">
              <a href="#fleet" className="primary-button public-button">View Cars</a>
              <a href="#contact" className="public-button public-button--secondary">Contact Us</a>
            </div>
          </div>

          <div className="public-highlight">
            <div className="public-highlight__card">
              <span>Available fleet</span>
              <strong>{cars.length}</strong>
              <p>Well-maintained cars across economy, sedan, and SUV categories.</p>
            </div>
            <div className="public-highlight__grid">
              <div>
                <strong>24/7</strong>
                <span>Customer support</span>
              </div>
              <div>
                <strong>Easy</strong>
                <span>Booking process</span>
              </div>
              <div>
                <strong>Clean</strong>
                <span>Transparent pricing</span>
              </div>
              <div>
                <strong>Fast</strong>
                <span>Pickup assistance</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="public-main">
        <section className="company-strip">
          <div className="company-strip__item">
            <strong>Trusted local service</strong>
            <span>Professional rentals for daily and weekly travel needs.</span>
          </div>
          <div className="company-strip__item">
            <strong>Flexible options</strong>
            <span>Choose from compact cars, executive sedans, and family SUVs.</span>
          </div>
          <div className="company-strip__item">
            <strong>Simple support</strong>
            <span>Call, WhatsApp, or visit us for booking guidance and availability.</span>
          </div>
        </section>

        <section id="fleet" className="public-section">
          <div className="public-section__heading">
            <div>
              <p className="eyebrow">Available cars</p>
              <h2>Browse the current fleet</h2>
            </div>
            <p>
              A quick look at the cars currently ready for booking. Each listing shows
              the essentials customers usually want first.
            </p>
          </div>

          <div className="fleet-grid">
            {cars.length > 0 ? (
              cars.map((car) => (
                <article key={car.id} className="fleet-card">
                  <div className="fleet-card__imageWrap">
                    <img
                      src={car.image_url || fallbackImage}
                      alt={car.car_name}
                      className="fleet-card__image"
                    />
                    <span className="status-pill status-pill--available">Available</span>
                  </div>
                  <div className="fleet-card__body">
                    <div className="fleet-card__top">
                      <div>
                        <h3>{car.car_name}</h3>
                        <p>{car.brand} {car.model}</p>
                      </div>
                      <strong>AED {car.rent_per_day}/day</strong>
                    </div>
                    <div className="fleet-card__meta">
                      <span>Reg: {car.reg_no}</span>
                      <span>Year: {car.year_of_make || "N/A"}</span>
                      <span>Seats: {car.seat_count || "N/A"}</span>
                      <span>Fuel: {car.fuel_type || "N/A"}</span>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="public-empty">
                No cars are available right now. Please contact the team for the next
                available rental options.
              </div>
            )}
          </div>
        </section>

        <section id="about" className="public-section public-section--split">
          <div className="info-card">
            <p className="eyebrow">About us</p>
            <h2>Built for convenient everyday rentals</h2>
            <p>
              DriveDesk Rentals helps customers book dependable cars with clear rental
              rates and responsive service. Whether you need a car for a day, a weekend,
              or longer, our team keeps the process simple.
            </p>
          </div>
          <div className="info-card info-card--accent">
            <p className="eyebrow">Why customers choose us</p>
            <ul className="public-list">
              <li>Wide choice of ready-to-drive cars</li>
              <li>Transparent daily rates with no hidden surprises</li>
              <li>Helpful support before pickup and during the rental</li>
              <li>Fast booking coordination for urgent travel plans</li>
            </ul>
          </div>
        </section>

        <section id="contact" className="public-section">
          <div className="public-contact">
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Talk to our rental team</h2>
              <p>
                Reach out for availability, pricing, or help choosing the right car for
                your trip.
              </p>
            </div>
            <div className="contact-grid">
              <div className="contact-card">
                <span>Phone</span>
                <strong>+971 50 123 4567</strong>
              </div>
              <div className="contact-card">
                <span>Email</span>
                <strong>info@drivedesk.com</strong>
              </div>
              <div className="contact-card">
                <span>Office</span>
                <strong>Dubai, United Arab Emirates</strong>
              </div>
              <div className="contact-card">
                <span>Hours</span>
                <strong>Mon - Sun, 8:00 AM - 10:00 PM</strong>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

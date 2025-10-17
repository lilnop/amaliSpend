import { Link } from "react-router-dom";

export default function Hero() {
    return (
        // < !--Hero Section-- >
        <section class="hero">
            <div class="hero-content">
                <h1>Take Control of Your Finances</h1>
                <p>Track every expense, manage your budget, and achieve your financial goals with AmaliSpend - the simple, powerful expense tracker.</p>
                <div class="hero-buttons">
                    <Link to={"/login"}>
                        <button class="cta-button">Start Tracking Free</button>
                    </Link>
                    <a href="#ratings">
                        <button class="secondary-button">Ratings</button>
                    </a>
                </div>
            </div>
        </section>
    )
}
import { Link } from "react-router-dom";

export default function HeadLanding() {
    return (
        <header>
            <nav>
                <div class="logo">AmaliSpend</div>
                <ul class="nav-links">
                    <li><a href="#features">Features</a></li>
                    <li><a href="#how-it-works">How It Works</a></li>
                    <li><a href="#pricing">Pricing</a></li>
                </ul>

                <div>
                    <Link to={"/login"}>
                        <button class="cta-button">Login</button>
                    </Link>
                    <Link to={"/signup"}>
                        <button class="cta-button">SignUp</button>
                    </Link>
                </div>
            </nav>
        </header>
    )
}
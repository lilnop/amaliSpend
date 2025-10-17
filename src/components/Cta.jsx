import { Link } from "react-router-dom";

export default function Cta() {
    return (
        // <!-- CTA Section -->\
        <section class="cta-section">
            <h2>Ready to Transform Your Finances?</h2>
            <p>Join thousands of users who have taken control of their money with AmaliSpend</p>
            <Link to={"/signup"}>
                <button class="cta-button" >
                    Start Your Free Trial
                </button>
            </Link>

        </section>
    )
}
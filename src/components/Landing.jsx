import Cta from "./Cta";
import Features from "./Features";
import Footer from "./Footer";
import HeadLanding from "./HeadLanding";
import Hero from "./Hero";
import How from "./How";
import Stats from "./Stats";

export default function Landing() {
    return (
        <>
            <HeadLanding />
            <Hero />
            <Features />
            <Stats />
            <How />
            <Cta />
            <Footer />
        </>
    )
}
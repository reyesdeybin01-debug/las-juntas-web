import CameraScroll from "@/components/CameraScroll";
import Navbar from "@/components/Navbar";
import FeaturedDishes from "@/components/FeaturedDishes";
import Menu from "@/components/Menu";
import Cart from "@/components/Cart";
import AboutUs from "@/components/AboutUs";
import Reservations from "@/components/Reservations";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
    return (
        <main className="relative overflow-hidden">
            {/* Background ambient glowing orbs */}
            <div className="bg-glow bg-primary/20 w-[600px] h-[600px] top-0 left-[-200px]" />
            <div className="bg-glow bg-accent/20 w-[500px] h-[500px] top-[150vh] right-[-100px]" />
            <div className="bg-glow bg-primary/10 w-[700px] h-[700px] top-[300vh] left-[-300px]" />
            <div className="bg-glow bg-accent/10 w-[400px] h-[400px] bottom-[100vh] right-0" />

            <Navbar />
            <CameraScroll />
            <FeaturedDishes />
            <Menu />
            <AboutUs />
            <Reservations />
            <Contact />
            <Footer />
            <Cart />
            <WhatsAppButton />
        </main>
    );
}

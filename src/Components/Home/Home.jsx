import Footer from "../Shared/Footer/Footer";
import Banner from "./Banner";
import Contact from "./Contact/Contact";
import Info from "./Info/Info";
import MakeAppointment from "./MakeAppointment/MakeAppointment";
import Services from "./Services/Services";
import Testimonial from "./Testimonial/Testimonial";


export default function Home() {
    return (
        <div className="px-12">
            <Banner />
            <Info />
            <Services />
            <MakeAppointment />
            <Testimonial />
            <Contact />
            <Footer />
        </div>
    )
}

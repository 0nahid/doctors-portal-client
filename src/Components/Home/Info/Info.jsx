import clock from "../../../assets/icons/clock.svg";
import marker from "../../../assets/icons/marker.svg";
import phone from "../../../assets/icons/phone.svg";
import CardInfo from "./CardInfo";
export default function Info() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5   justify-items-center ">
            <CardInfo bg="bg-primary" cardTitle="Opening Hours" img={clock} />
            <CardInfo bg="bg-accent" cardTitle="Visit our location" img={marker} />
            <CardInfo bg="bg-secondary" cardTitle="Contact us now" img={phone} />
        </div>
    )
}

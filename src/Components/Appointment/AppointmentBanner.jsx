import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import bg from '../../assets/images/bg.png';
import chair from '../../assets/images/chair.png';
export default function AppointmentBanner({ date, setDate }) {

    return (
        <div className="grid grid-cols-1 justify-items-center md:flex md:justify-around md:items-center " style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
        }} >
            <div className="shadow-2xl p-2 rounded-xl mb-5">
                <DayPicker
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                />
            </div>
            <div>
                <img className="px-5 object-cover  md:h-64" src={chair} alt="" />
            </div>

        </div>
    )
}

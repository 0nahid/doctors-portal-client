import cavity from '../../../assets/images/cavity.png'
import fluoride from '../../../assets/images/fluoride.png'
import whitening from '../../../assets/images/whitening.png'
import Service from './Service'
import ServiceHero from './ServiceHero'
export default function Services() {
    const services = [
        {
            _id: 1,
            name: 'Fluoride Treatment ',
            description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img: fluoride
        },
        {
            _id: 2,
            name: 'Cavity Filling',
            description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img: cavity
        },
        {
            _id: 3,
            name: 'Whitening',
            description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img: whitening
        }
    ]
    return (
        <div className="my-28">
            <div className="text-center ">
                <h3 className="text-primary uppercase font-bold text-2xl">our service</h3>
                <h2 className="text-3xl mb-5">Services We Provide</h2>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
                    {
                        services.map(service => <Service key={service._id} service={service} />)
                    }
                </div>
            </div>
            <ServiceHero />
        </div>
    )
}

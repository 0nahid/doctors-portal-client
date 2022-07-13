import quote from '../../../assets/icons/quote.svg'
import people1 from '../../../assets/images/people1.png'
import people2 from '../../../assets/images/people2.png'
import people3 from '../../../assets/images/people3.png'
import Review from './Review'
export default function Testimonial() {
    const reviews = [
        {
            _id: 1,
            name: 'John Doe',
            designation: 'CEO, XYZ',
            review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
            img: people1
        },
        {
            _id: 2,
            name: 'John Doe',
            designation: 'CEO, XYZ',
            review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
            img: people2
        },
        {
            _id: 3,
            name: 'John Doe',
            designation: 'CEO, XYZ',
            review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
            img: people3
        }

    ]
    return (
        <section className="mt-5">
            <div className='flex justify-between'>
                <div>
                    <h4 className="text-xl text-primary font-bold">Testimonial</h4>
                    <h4 className="text-3xl">What our Patients says</h4>
                </div>
                <div>
                    <img src={quote} className="w-24 lg:w-48" alt="quote" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
                {reviews.map(reviews => <Review key={reviews._id} reviews={reviews} />)}
            </div>
        </section>
    )
}

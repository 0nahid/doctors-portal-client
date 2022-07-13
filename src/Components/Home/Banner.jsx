import chair from '../../assets/images/chair.png'
export default function Banner() {
    return (
        <div className="hero md:min-h-screen mx-auto">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={chair} className="w-full lg:max-w-lg  rounded-lg shadow-2xl " alt="banner" />
                <div>
                    <h1 className="text-5xl font-bold">Your New Smile Starts Here</h1>
                    <p className="py-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the</p>
                    <button className="btn btn-primary bg-gradient-to-r from-secondary to-primary">GET STARTED</button>
                </div>
            </div>
        </div>
    )
}

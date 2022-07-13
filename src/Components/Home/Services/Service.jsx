
export default function Service({ service }) {
    const { name, review, img } = service;
    // console.log(name);
    return (
        <div className="card w-full bg-base-100 shadow-2xl">
            <figure className="px-10 pt-10">
                <img src={img} alt={name} className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{review}</p>
            </div>
        </div>
    )
}

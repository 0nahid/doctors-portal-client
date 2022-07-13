
export default function Review({ reviews }) {
    const { name, designation, review, img } = reviews;
    // console.log(name);
    return (
        <div className="card w-lg bg-base-100 shadow-2xl">
            <figure className="px-10 pt-10 ">
                <img className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2" src={img} alt={name} />
            </figure>
            <div className="flex justify-center items-center mt-3">
                <h2 className="card-title">{name}</h2>
                <div className="badge badge-outline mt-1 ml-1">{designation}</div>
            </div>
            <div className="card-body items-center text-center">
                <p>{review}</p>
            </div>
        </div>
    )
}

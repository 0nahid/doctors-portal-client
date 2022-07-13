
export default function CardInfo({ img, cardTitle, bg }) {
    return (
        <div className={`card lg:card-side shadow-xl bg-accent text-white p-5 ${bg} `}>
            <figure>
                <img src={img} alt="Album" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{cardTitle}</h2>
                <p>Click the button to listen on Spotiwhy app.</p>
            </div>
        </div>
    )
}

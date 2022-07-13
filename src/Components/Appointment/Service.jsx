export default function Service({ service, setTreatment }) {
    const { _id, name, slots } = service;
    // console.log(_id, name);
    return (
        <div className="card w-96 bg-base-100 shadow-2xl text-center">
            <div className="card-body ">
                <h2 className="text-2xl font-bold text-accent">{name}</h2>
                <p>
                    {
                        slots.length > 0 ?
                            // slots.map(slot => <span key={slot} className="badge badge-outline mt-1 ml-1">{slot}</span>)
                            <span className="badge badge-success badge-outline  mt-1 ml-1">{slots.length} Available slots</span>
                            :
                            <span className="badge badge-error badge-outline  mt-1 ml-1">Try another date or contact helpline.</span>
                    }
                </p>
                <p className="uppercase font-semibold">{slots.length} {slots.length > 1 ? 'spaces' : 'space'} avialable</p>
                <p>{slots[0]}</p>
                <div className="card-actions justify-center">
                    <label htmlFor="booking-modal"
                        disabled={slots.length === 0}
                        onClick={() => setTreatment(service)} className="btn btn-secondary text-white font-bold  modal-button">BOOK Appointment</label>
                </div>
            </div>
        </div>
    )
}

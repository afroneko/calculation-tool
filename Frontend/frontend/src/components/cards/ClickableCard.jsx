

export default function ClickableCard({ img, title, description, onClick }) {

    return(
       <div className="clickable-card">
            <img src={image} alt={name} className="cloud-image" />

            <div className="info">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>

    );
}
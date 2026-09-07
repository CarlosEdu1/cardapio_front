import "./card.css"


interface CardProps {
    id?: number;
    price: number;
    title: string;
    image: string;
    onDelete: (id: number) => void
}

export function Card({id, price, title, image, onDelete }: CardProps) {
    return (
        <div className="card">
            <img src={image} />
            <h2>{title}</h2>
            <p>
                <b>Valor: R$ {price}</b>
            </p>

            {id !== undefined &&(
                <button type="button" onClick={() => onDelete(id)}>
                    Excluir
                </button>
            )}
        </div>
    );
}

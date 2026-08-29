import { useEffect, useState } from "react"
import { useFoodDataMutate } from "../hooks/useFoodDataMutate"
import type { FoodData } from "../interface/FoodData"
import "./create-modal.css"

interface InputProps {
    label: string;
    value: string | number;
    updateValue: (value: string) => void;
}

interface ModalProps {
    closeModal(): void;
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)} />
        </>
    );
};

export function CreateModal({ closeModal }: ModalProps) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const { mutate, isSuccess, isPending } = useFoodDataMutate();

    const submit = () => {
        const foodData: FoodData = {
            title,
            price,
            image
        };
        mutate(foodData);
    };

    useEffect(() => {
        if (isSuccess) {
            closeModal();
        }
    }, [isSuccess, closeModal]);

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo item no cardápio</h2>
                <form
                    className="input-container"
                    onSubmit={event => {
                        event.preventDefault();
                        submit();
                    }}
                >
                    <Input label="Title" value={title} updateValue={setTitle} />
                    <Input label="Price" value={price} updateValue={value => setPrice(Number(value))} />
                    <Input label="Image" value={image} updateValue={setImage} />

                    <div>
                        <button type="submit" className="btn-secondary">
                            {isPending ? 'postando...' : 'postar'}
                        </button>
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={closeModal}>
                            Fechar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

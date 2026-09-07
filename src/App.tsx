import './App.css'
import { useState } from 'react';
import { Card } from './components/cards';
import { CreateModal } from './create-modal/create-modal';
import { useFoodData } from './hooks/useFood';
import { useFoodDataDelete } from "./hooks/useFood";


function App() {
  const { data } = useFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {mutate: deleteFood} = useFoodDataDelete();

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev);
  };

  return (
    <>
      <div className="container">
        <h1>Cardápio</h1>
        <div className="card-grid">
          {data?.map(foodData => (
            <Card
              key={foodData.id}
              id={foodData.id}
              price={foodData.price}
              title={foodData.title}
              image={foodData.image}
              onDelete={deleteFood}
            />
          ))}
        </div>
      </div>

      {isModalOpen && <CreateModal closeModal={handleOpenModal} />}
      <button className = "btn-add" onClick={handleOpenModal}>Adicionar Novo Prato</button>
    </>
  );
}

export default App

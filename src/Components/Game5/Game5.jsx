import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { NavLink } from 'react-router-dom';

// Import local images
import yogurImage from '../../assets/level5/yogur.png';
import lecheImage from '../../assets/level5/Leche.png';
import quesoImage from '../../assets/level5/queso.png';
import heladoImage from '../../assets/level5/helado.png';
import mantecaImage from '../../assets/level5/manteca.png';
import cremaImage from '../../assets/level5/dulcedeleche.png';
import carne from "../../assets/Fotos nuevas juego BI/steak.png"
import huevo from "../../assets/Fotos nuevas juego BI/egg.png"
import milkshake from "../../assets/Fotos nuevas juego BI/milkshake.png"


const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const items = [
  { 
    id: 1, 
    name: 'Yogur', 
    type: 'fruit', 
    image: yogurImage
  },
  { 
    id: 2, 
    name: 'Leche', 
    type: 'fruit', 
    image: lecheImage
  },
  { 
    id: 3, 
    name: 'Queso', 
    type: 'fruit', 
    image: quesoImage
  },
  { 
    id: 4, 
    name: 'Helado', 
    type: 'vegetable', 
    image: heladoImage
  },
  { 
    id: 5, 
    name: 'Manteca', 
    type: 'vegetable', 
    image: mantecaImage
  },
  { 
    id: 6, 
    name: 'Crema', 
    type: 'vegetable', 
    image: cremaImage
  },
  { 
    id: 7, 
    name: 'Crema', 
    type: 'fruit', 
    image: carne
  },
  { 
    id: 8, 
    name: 'Crema', 
    type: 'fruit', 
    image: huevo
  },
  { 
    id: 9, 
    name: 'Crema', 
    type: 'vegetable', 
    image: milkshake
  },
];

function DraggableItem({ item, onDrop }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: { ...item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div 
      ref={drag}
      style={{
        ...styles.itemContainer,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <img 
        src={item.image} 
        alt={item.name}
        style={styles.image}
      />
      <div style={styles.itemLabel}>
        {item.name}
      </div>
    </div>
  );
}

function DropZone({ type, items, onDrop }) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'ITEM',
    drop: (droppedItem) => onDrop(droppedItem, type),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const boxStyle = type === 'fruit' ? styles.fruitBox : styles.vegetableBox;

  return (
    <div 
      ref={drop}
      style={{
        ...styles.dropBox,
        ...boxStyle,
        backgroundColor: isOver ? (canDrop ? '#90EE90' : '#FF6347') : boxStyle.backgroundColor,
      }}
    >
      <h2 style={styles.boxTitle}>{type === 'fruit' ? 'Ricos en proteína' : 'Pobres en proteínas​'}</h2>
      <div style={styles.itemsGrid}>
        {items.map(item => (
          <div key={item.id} style={styles.itemContainer}>
            <img 
              src={item.image} 
              alt={item.name}
              style={styles.image}
            />
            <div style={styles.itemLabel}>
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Game5({ onBackToLevels }) {
  const [fruits, setFruits] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  const [unsorted, setUnsorted] = useState(items);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    if (unsorted.length === 0) {
      setGameCompleted(true);
    }
  }, [unsorted]);

  const handleDrop = (item, boxType) => {
    if (item.type === boxType) {
      if (boxType === 'fruit') {
        setFruits(prevFruits => [...prevFruits, item]);
      } else {
        setVegetables(prevVegetables => [...prevVegetables, item]);
      }
      setUnsorted(prevUnsorted => prevUnsorted.filter(i => i.id !== item.id));
      setScore(prevScore => prevScore + 10);
    } else {
      setScore(prevScore => Math.max(0, prevScore - 5));
    }
  };

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <div style={styles.container}>
        <h1 style={styles.title}>Arrastrá cada alimento según corresponda para conocer cuál nos aporta más proteínas. ​</h1>
        
        <div style={styles.introText}>
        Las proteínas completas o de buena calidad ayudan a formar, mantener y reparar los tejidos del cuerpo como músculos y piel. Comamos a lo largo del día alimentos fuente de proteína. ​
        </div>

        <div style={styles.scoreBoard}>
          Puntuación: {score}
        </div>

        {gameCompleted && (
          <div style={styles.congratsMessage}>
            <div style={styles.congratsTitle}>¡Felicitaciones!</div>
            <div style={styles.congratsText}>
           ¿Sabías que combinando legumbres con cereales, por ejemplo arroz con lentejas, obtenemos proteínas de buena calidad? Buscá distintas preparaciones que combinen legumbres con cereales.  ​
              {score === items.length * 10 && " ¡Puntuación perfecta!"}
            </div>
            <NavLink
              style={styles.backButton}
              onClick={onBackToLevels}
              to='/'
            >
              Volver a los Niveles
            </NavLink>
          </div>
        )}
        
        <div style={styles.boxesContainer}>
          <DropZone 
            type="fruit" 
            items={fruits} 
            onDrop={handleDrop} 
          />
          
          <DropZone 
            type="vegetable" 
            items={vegetables} 
            onDrop={handleDrop} 
          />
        </div>
        
        <div style={styles.unsortedSection}>
          <div style={styles.itemsGrid}>
            {unsorted.map(item => (
              <DraggableItem 
                key={item.id} 
                item={item}
                onDrop={handleDrop}
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f0f8ff',
    borderRadius: '15px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    fontSize: '1.2em',
    marginBottom: '20px',
  },
  introText: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    color: '#2c3e50',
    fontSize: '1.1em',
    lineHeight: '1.6',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  scoreBoard: {
    textAlign: 'center',
    fontSize: '1.5em',
    color: '#2c3e50',
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  boxesContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '30px',
  },
  dropBox: {
    flex: 1,
    padding: '15px',
    borderRadius: '10px',
    minHeight: '300px',
  },
  fruitBox: {
    backgroundColor: '#99C24D',
  },
  vegetableBox: {
    backgroundColor: '#F18F01',
  },
  boxTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: '1.5em',
    marginBottom: '15px',
  },
  itemsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '10px',
    padding: '10px',
    justifyItems: 'center', // Center items horizontally
    alignItems: 'center', // Center items vertically
  },
  itemContainer: {
    position: 'relative',
    cursor: 'move',
    transition: 'transform 0.2s',
  },
  image: {
    width: '100%',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '8px',
 
  },
  itemLabel: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: '0',
    transition: 'opacity 0.2s',
    borderRadius: '8px',
  },
  unsortedSection: {
    marginTop: '20px',
  },
  congratsMessage: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  congratsTitle: {
    fontSize: '1.5em',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  congratsText: {
    fontSize: '1.1em',
    marginBottom: '20px',
  },
  backButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '1.1em',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '10px',
  },
};

export default Game5;


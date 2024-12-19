import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { NavLink } from 'react-router-dom';
import Lenteja from '../../assets/level4/lentejas.png'
import Mung from '../../assets/level4/porotosmung.png'
import Quinoa from '../../assets/level4/quinoa.png'
import Garbanzo from '../../assets/level4/garbanzo.png'
import Integral from '../../assets/level4/arrozintegral.png'
import serraceno from '../../assets/level4/Trigosarraceno.png'

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const items = [
  { id: 1, name: 'Banana', type: 'Lentejas', image: Lenteja},
  { id: 3, name: 'Carrot', type: 'Arroz_Integral', image: Integral },
  { id: 4, name: 'Broccoli', type: 'Quinoa', image: Quinoa},
  { id: 5, name: 'Olive Oil', type: 'Porotos_Mung', image: Mung },
  { id: 6, name: 'Avocado', type: 'Garbanzos', image: Garbanzo},
  { id: 7, name: 'Bread', type: 'Serraceno', image: serraceno },
  
];

const categories = ['Lentejas', 'Arroz_Integral', 'Porotos_Mung', 'Quinoa', 'Serraceno', 'Garbanzos'];

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

  const boxStyle = {
    ...styles.dropBox,
    backgroundColor: isOver ? (canDrop ? '#90EE90' : '#FF6347') : styles.categoryColors[type],
  };

  return (
    <div ref={drop} style={boxStyle}>
      <h2 style={styles.boxTitle}>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
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

function Game7({ onBackToLevels }) {
  const [categorizedItems, setCategorizedItems] = useState(
    Object.fromEntries(categories.map(category => [category, []]))
  );
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
      setCategorizedItems(prev => ({
        ...prev,
        [boxType]: [...prev[boxType], item]
      }));
      setUnsorted(prevUnsorted => prevUnsorted.filter(i => i.id !== item.id));
      setScore(prevScore => prevScore + 10);
    } else {
      setScore(prevScore => Math.max(0, prevScore - 5));
    }
  };

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <div style={styles.container}>
        <h1 style={styles.title}>Arrastrá cada legumbre o cereal a su nombre correcto. Al finalizar, descubrí el mensaje que te invita a ponerte en acción para ser más saludable</h1>
        
        <div style={styles.introText}>
        “Comamos legumbres y cereales integrales que nos dan más fibra. Podemos combinar legumbres y cereales, que nos dan proteína de alto valor biológico, como una alternativa para reemplazar la carne.” 

        </div>

        <div style={styles.scoreBoard}>
          Puntuación: {score}
        </div>

        {gameCompleted && (
          <div style={styles.congratsMessage}>
            <div style={styles.congratsTitle}>¡Felicitaciones!</div>
            <div style={styles.congratsText}>
            Buscá la receta de una preparación con legumbres como porotos, lentejas, garbanzos. ¿Te animás a prepararla? 
Animate a probar nuevas legumbres en familia. Dejalas en remojo unas horas antes de cocinarlas.  

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
          {categories.map(category => (
            <DropZone 
              key={category}
              type={category} 
              items={categorizedItems[category]} 
              onDrop={handleDrop} 
            />
          ))}
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
    maxWidth: '100%',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f0f8ff',
    borderRadius: '15px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
    overflowX: 'hidden',
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    fontSize: '1.5em',
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
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  '@media (max-width: 768px)': {
    boxesContainer: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  '@media (max-width: 480px)': {
    boxesContainer: {
      gridTemplateColumns: '1fr',
    },
  },
  dropBox: {
    padding: '15px',
    borderRadius: '10px',
    minHeight: '200px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  categoryColors: {
    Lentejas: '#ff7f50',
    Arroz_Integral: '#32cd32',
    Serraceno: '#ffd700',
    Quinoa: '#deb887',
    Porotos_Mung: '#87cefa',
    Garbanzos: '#fa8072',
  },
  boxTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: '1.3em',
    marginBottom: '15px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
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
    '&:hover': {
      transform: 'scale(1.05)',
    },
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
    '&:hover': {
      opacity: '1',
    },
  },
  unsortedSection: {
    marginTop: '20px',
    overflowX: 'auto',
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
    textDecoration: 'none',
    display: 'inline-block',
    '&:hover': {
      backgroundColor: '#0d8bf2',
    },
  },
};

export default Game7;


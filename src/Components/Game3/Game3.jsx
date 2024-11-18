import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const items = [
  { 
    id: 1, 
    name: 'Banana', 
    type: 'fruit', 
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=200&h=200' 
  },
  { 
    id: 2, 
    name: 'Apple', 
    type: 'fruit', 
    image: 'https://plus.unsplash.com/premium_photo-1669137055919-b7bb2d70328a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGNvbWlkYSUyMHNhbHVkYWJsZXxlbnwwfHwwfHx8MA%3D%3D' 
  },
  { 
    id: 3, 
    name: 'Carrot', 
    type: 'vegetable', 
    image: 'https://plus.unsplash.com/premium_photo-1661288452010-951ca57991fc?q=80&w=3879&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
  },
  { 
    id: 4, 
    name: 'Broccoli', 
    type: 'vegetable', 
    image: 'https://plus.unsplash.com/premium_photo-1715015439764-1e8d37d5c6c9?q=80&w=3776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
  },
  { 
    id: 5, 
    name: 'Tomato', 
    type: 'vegetable', 
    image: 'https://plus.unsplash.com/premium_photo-1674498559663-da58647b1834?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBhcGFzJTIwZnJpdGFzfGVufDB8fDB8fHww' 
  },
  { 
    id: 6, 
    name: 'Strawberry', 
    type: 'fruit', 
    image: 'https://media.istockphoto.com/id/2159415119/photo/barbecued-chicken-drumsticks-with-fresh-vegetables-on-wooden-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=tPokZG810izLuwrzfhScVrGnDWJTiD1vENAg7Ko5GEg=' 
  },
];

function Game3({ onBackToLevels }) {
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

  function handleDragStart(e, item) {
    e.dataTransfer.setData('application/json', JSON.stringify(item));
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e, boxType) {
    e.preventDefault();
    try {
      const item = JSON.parse(e.dataTransfer.getData('application/json'));
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
    } catch (error) {
      console.error('Error processing drop:', error);
    }
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
      fontSize: '2em',
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
      backgroundColor: '#ff7f50',
    },
    vegetableBox: {
      backgroundColor: '#32cd32',
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
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
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
    backButtonHover: {
      backgroundColor: '#1976D2',
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Ordena alimentos que podemos consumir</h1>
      
      <div style={styles.introText}>
        ¡Bienvenido al juego de clasificación! Arrastra cada alimento a su caja correspondiente: 
        frutas a la caja naranja y verduras a la caja verde. Ganarás 10 puntos por cada acierto 
        y perderás 5 puntos por cada error. ¡Demuestra tus conocimientos sobre alimentos!
      </div>

      <div style={styles.scoreBoard}>
        Puntuación: {score}
      </div>

      {gameCompleted && (
        <div style={styles.congratsMessage}>
          <div style={styles.congratsTitle}>¡Felicitaciones!</div>
          <div style={styles.congratsText}>
            Has completado el juego con una puntuación de {score} puntos.
            {score === items.length * 10 && " ¡Puntuación perfecta!"}
          </div>
          <NavLink
            style={styles.backButton}
            onClick={onBackToLevels}
            onMouseOver={(e) => e.target.style.backgroundColor = styles.backButtonHover.backgroundColor}
            onMouseOut={(e) => e.target.style.backgroundColor = styles.backButton.backgroundColor}
            to='/'
          >
            Volver a los Niveles
          </NavLink>
        </div>
      )}
      
      <div style={styles.boxesContainer}>
        <div 
          style={{...styles.dropBox, ...styles.fruitBox}}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'fruit')}
        >
          <h2 style={styles.boxTitle}>Consumir diariamente</h2>
          <div style={styles.itemsGrid}>
            {fruits.map(item => (
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
        
        <div 
          style={{...styles.dropBox, ...styles.vegetableBox}}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'vegetable')}
        >
          <h2 style={styles.boxTitle}>Consumir a veces</h2>
          <div style={styles.itemsGrid}>
            {vegetables.map(item => (
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
      </div>
      
      <div style={styles.unsortedSection}>
        <div style={styles.itemsGrid}>
          {unsorted.map(item => (
            <div 
              key={item.id} 
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              style={styles.itemContainer}
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default Game3;
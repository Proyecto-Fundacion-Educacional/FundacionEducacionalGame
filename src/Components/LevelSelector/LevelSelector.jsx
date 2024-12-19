import React from 'react';
import { Star } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const styles = {
  levelSelector: {
    padding: '32px',
    maxWidth: '800px',
    margin: '0 auto'
  },
  title: {
    fontSize: '34px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '32px'
  },
  levelGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '16px',
    padding: '16px'
  },
  levelItem: {
    position: 'relative'
  },
  baseLevelStyle: {
    padding: '24px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  unlocked: {
    backgroundColor: '#3b82f6',
    color: 'white',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  icon: {
    width: '24px',
    height: '24px'
  }
};

export const LevelSelector = () => {
  const levels = [
    { id: 1, name: "Ordenar Frutas y Verduras", path: "lvl1" },
    { id: 2, name: "Nivel 2", path: "lvl2" },
    { id: 3, name: "Nivel 3", path: "lvl3" },
    { id: 4, name: "Nivel 4", path: "lvl4" },
    { id: 5, name: "Nivel 5", path: "lvl5" },
    { id: 6, name: "Nivel 6", path: "lvl6" },
    { id: 7, name: "Nivel 7", path: "lvl7" }
    
  ];

  const handleLevelClick = (level) => () => {
    console.log(`Selected level ${level.id}`);
  };

  return (
    <div style={styles.levelSelector}>
      <h1 style={styles.title}>Juguemos con los alimentos! 😀 </h1>
      <div style={styles.levelGrid}>
        {levels.map((level) => (
          <div key={level.id} style={styles.levelItem}>
            <NavLink
              to={level.path}
              onClick={handleLevelClick(level)}
              style={({ isActive }) => ({
                ...styles.baseLevelStyle, 
                ...styles.unlocked,
                ...(isActive ? { backgroundColor: '#2563eb' } : {})
              })}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
            >
              <Star style={styles.icon} />
              <span>{level.name}</span>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};


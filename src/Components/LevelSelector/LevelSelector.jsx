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
  },
  levelText: {
    textAlign: 'center',
    width: '100%'
  }
};

export const LevelSelector = () => {
  const levels = [
    { id: 1, name: "Frutas y Verduras", path: "lvl1" },
    { id: 2, name: "¿Es saludable? ", path: "lvl2" },
    { id: 3, name: "Grasas beneficiosas o perjudiciales ", path: "lvl3" },
    { id: 4, name: "Grupos de alimentos ", path: "lvl4" },
    { id: 5, name: "Alimentos fuente de proteínas", path: "lvl5" },
    { id: 6, name: "Más o menos fibra", path: "lvl6" },
    { id: 7, name: "Agua segura ", path: "lvl7" }
    
  ];

  const handleLevelClick = (level) => () => {
    console.log(`Selected level ${level.id}`);
  };

  return (
    <div style={styles.levelSelector}>
      <h1 style={styles.title}>¡El mundo de los alimentos! 😀 </h1>
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
              <span style={styles.levelText}>{level.name}</span>
            </NavLink>
          </div>
        ))}
      </div>
      
      {/* Botón de feedback */}
      <button
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.4s ease',
          zIndex: 1000
        }}
        onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfF0feRxUfvaDi8fW_HRESp6TywWqUTvyGMgCcVLk_hJWb0vQ/viewform', '_blank')}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#059669';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#10b981';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }}
      >
        Entréganos feedback
      </button>
    </div>
  );
};
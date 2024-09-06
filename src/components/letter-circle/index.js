import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.scss';
import { getLettersFromLevelVocabulary } from '../../utils/getLettersFromLevelVocabulary';

export const LetterCircle = ({ words, guessWord }) => {
  const radius = 135;
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef(null);
  const [currentPoint, setCurrentPoint] = useState(null);
  const letters = getLettersFromLevelVocabulary(words);

  const handleStart = (index, event) => {
    setIsDragging(true);
    const touch = event.touches ? event.touches.item(0) : event;
    const buttonElement = event.target.getBoundingClientRect();
    const rect = svgRef.current.getBoundingClientRect();
    const centerX = buttonElement.left + buttonElement.width / 2 - rect.left;
    const centerY = buttonElement.top + buttonElement.height / 2 - rect.top;

    setSelectedPoints([{ x: centerX, y: centerY, id: touch.target.id, letter: touch.target.innerHTML }]);
  };

  const handleMove = (event) => {
    if (isDragging) {
      const touch = event.touches ? event.touches.item(0) : event;
      const rect = svgRef.current.getBoundingClientRect();
      setCurrentPoint({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    const finalWord = selectedPoints.map(dot => dot.letter).join('').toLowerCase();
    guessWord(finalWord);
    setSelectedPoints([]);
    setCurrentPoint(null);
  };

  const handleLetterHover = (index, event) => {
    if (isDragging) {
      const buttonElement = event.target.getBoundingClientRect();
      const rect = svgRef.current.getBoundingClientRect();
      const centerX = buttonElement.left + buttonElement.width / 2 - rect.left;
      const centerY = buttonElement.top + buttonElement.height / 2 - rect.top;

      const isSelected = selectedPoints.some(point => point.id === event.target.id);

      if (selectedPoints[selectedPoints.length - 2]?.id === event.target.id) {
        setSelectedPoints(prev => prev.slice(0, -1));
      }

      if (!isSelected) {
        setSelectedPoints((prevPoints) => [...prevPoints, { x: centerX, y: centerY, id: event.target.id, letter: event.target.innerHTML }]);
      }
    }
  };

  const handleTouchLetter = (index, event) => {
    if (isDragging) {
      const touch = event.touches ? event.touches[0] : event;

      letters.forEach((letter, index) => {
        const id = `${letter}-${index}`;
        const button = document.getElementById(id);
        const rect = button.getBoundingClientRect();

        if (
          touch.clientX >= rect.left &&
          touch.clientX <= rect.right &&
          touch.clientY >= rect.top &&
          touch.clientY <= rect.bottom
        ) {
          console.log('id')
          const buttonElement = button.getBoundingClientRect();
          const rect = svgRef.current.getBoundingClientRect();
          const centerX = buttonElement.left + buttonElement.width / 2 - rect.left;
          const centerY = buttonElement.top + buttonElement.height / 2 - rect.top;

          const isSelected = selectedPoints.some(point => point.id === id);

          if (selectedPoints[selectedPoints.length - 2]?.id === id) {
            setSelectedPoints(prev => prev.slice(0, -1));
          }

          if (!isSelected) {
            console.log('setting hover')
            setSelectedPoints((prevPoints) => [...prevPoints, { x: centerX, y: centerY, id: id, letter: button.innerHTML }]);
          }
        }
      });
    }
  };

  return (
    <div
      className={styles.circleContainer}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}    
    >
      <svg ref={svgRef} className={styles.svgOverlay}>
        <path
          d={
            selectedPoints.length
              ? `M ${selectedPoints.map((p) => `${p.x} ${p.y}`).join(' L ')} ${currentPoint ? `L ${currentPoint.x} ${currentPoint.y}` : ''
              }`
              : ''
          }
          stroke="#E96FA4"
          strokeWidth="10"
          fill="none"
        />
      </svg>

      {letters.sort().map((letter, index) => {
        const angle = (index / letters.length) * (2 * Math.PI);
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        const id = `${letter}-${index}`;
        const isActive = selectedPoints.some(point => point.id === id);

        return (
          <li
            className={styles.label}
            key={index}
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <button
              className={`${styles.letter} ${isActive ? styles.active : ''}`}
              onMouseDown={(e) => handleStart(index, e)}
              onMouseEnter={(e) => handleLetterHover(index, e)}
              onTouchStart={(e) => handleStart(index, e)} 
              onTouchMove={(e) => handleTouchLetter(index, e)}  
              id={id}
            >
              {letter.toUpperCase()}
            </button>
          </li>
        );
      })}
    </div>
  );
};

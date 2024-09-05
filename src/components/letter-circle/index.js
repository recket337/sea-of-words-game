import React, { useState, useRef } from 'react';
import styles from './styles.module.scss';
import { getLettersFromLevelVocabulary } from '../../utils/getLettersFromLevelVocabulary';

export const LetterCircle = ({ words, guessWord }) => {
  const radius = 135;
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef(null);
  const [currentPoint, setCurrentPoint] = useState(null);
  const letters = getLettersFromLevelVocabulary(words);

  const handleMouseDown = (index, event) => {
    setIsDragging(true);
    const buttonElement = event.target.getBoundingClientRect();
    const rect = svgRef.current.getBoundingClientRect();
    const centerX = buttonElement.left + buttonElement.width / 2 - rect.left;
    const centerY = buttonElement.top + buttonElement.height / 2 - rect.top;
    
    setSelectedPoints([{ x: centerX, y: centerY, id: event.target.id, id: event.target.id, letter: event.target.innerHTML }]);
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const rect = svgRef.current.getBoundingClientRect();
      setCurrentPoint({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const finalWord = selectedPoints.map(dot => dot.letter).join('').toLocaleLowerCase();
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

  return (
    <div
      className={styles.circleContainer}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <svg ref={svgRef} className={styles.svgOverlay}>
        <path
          d={
            selectedPoints.length
              ? `M ${selectedPoints.map((p) => `${p.x} ${p.y}`).join(' L ')} ${
                  currentPoint ? `L ${currentPoint.x} ${currentPoint.y}` : ''
                }`
              : ''
          }
          stroke="#E96FA4"
          strokeWidth="10"
          fill="none"
        />
      </svg>

      {letters.map((letter, index) => {
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
              className={`${styles.letter } ${isActive && styles.active}`}
              onMouseDown={(e) => handleMouseDown(index, e)}
              onMouseEnter={(e) => handleLetterHover(index, e)}
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

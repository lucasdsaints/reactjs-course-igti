import React from 'react'
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import * as api from './../api/apiService';

Modal.setAppElement('#root');


export default function ModalGrade({ onSave, onClose, selectedGrade }) {
  const { id, student, subject, type, value } = selectedGrade;

  const [gradeValue, setGradeValue] = useState(value);
  const [gradeValidation, setGradeValidation] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const validation = api.getValidationFromGradeType(type);
    console.log('lucas', validation)
    setGradeValidation(validation);
  }, [type]);

  useEffect(() => {
    const { minValue, maxValue } = gradeValidation;

    if (gradeValue < minValue || gradeValue > maxValue) {
      setErrorMessage(`O valor da nota deve ser entre ${minValue} e ${maxValue}`);
      return;
    }

    setErrorMessage('');
  }, [gradeValidation, gradeValue]);

  useEffect(() => {
    const handleKeyUp = event => {
      if (event.key !== 'Escape') { return; }
      onClose();
    };

    document.addEventListener('keyup', handleKeyUp);
  });

  const handleFormSubmint = (event) => {
    event.preventDefault();

    const formData = {
      id, 
      newValue: gradeValue
    };

    onSave(formData);
  };

  const handleGradeChange = (value) => {
    const newValue = Number(value.target.value);
    setGradeValue(newValue);
  }

  const handleClose = () => {
    onClose();
  }

  return (
    <div>
      <Modal isOpen={true} >

        <div style={styles.header}>
          <span style={styles.headerTitle}>Manutenção de notas</span>
          <button
            style={styles.closeButton}
            onClick={handleClose}
            className="btn waves-effect waves-light red darken-4">
            X
          </button>
        </div>

        <form onSubmit={handleFormSubmint}>

          <div className="input-field">
            <input value={student} id="studentName" type="text" readOnly />
            <label className="active" htmlFor="studentName">Nome do aluno:</label>
          </div>

          <div className="input-field">
            <input value={subject} id="subjectDescription" type="text" readOnly />
            <label className="active" htmlFor="subjectDescription">Disciplina:</label>
          </div>

          <div className="input-field">
            <input value={type} id="type" type="text" readOnly />
            <label className="active" htmlFor="type">Avaliação:</label>
          </div>

          <div className="input-field">
            <input
              value={gradeValue}
              onChange={handleGradeChange}
              id="gradeValue"
              type="number"
              min={gradeValidation.minValue}
              max={gradeValidation.maxValue}
              step="1"
              autoFocus
            />
            <label className="active" htmlFor="gradeValue">Nota:</label>
          </div>

          <div>
            <button
              disabled={errorMessage.trim() !== ''}
              className="btn waves-effect waves-light"
            >
              Salvar
          </button>
            <span style={styles.errorMessage}>{errorMessage}</span>
          </div>
        </form>

      </Modal>
    </div>
  )
}

const styles = {
  header: {
    fontSize: '1.4em',
    height: '60px',
    display: 'flex',
    position: 'relative',
    alignItems: 'center'
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center'
  },
  closeButton: {
    position: 'absolute',
    top: '0',
    right: '0'
  },
  errorMessage: {
    fontSize: '.8em',
    color: 'darkred',
    display: 'block',
    marginTop: '1em',
  }
}
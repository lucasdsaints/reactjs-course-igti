import React, { useState, useEffect } from 'react';

import * as api from './api/apiService';
import Spinner from './components/Spinner';
import GradesControl from './components/GradesControl';
import ModalGrade from './components/ModalGrade';

export default function App() { // 15
  const [allGrades, setAllGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadGrades = async () => {
      const grades = await api.getAllGrades();
      setAllGrades(grades);
    }
    setTimeout(loadGrades, 2000);
  }, []);

  const handleDelete = async (gradeToDelete) => {
    const isDeleted = await api.deleteGrade(gradeToDelete);

    if (isDeleted) {
      const deletedGradeIndex =
        allGrades.findIndex(grade => grade.id === gradeToDelete.id);

      const newGrades = Object.assign([], allGrades);
      newGrades[deletedGradeIndex].isDeleted = true;
      newGrades[deletedGradeIndex].value = 0;

      setAllGrades(newGrades);
    }
  };

  const handlePersist = (grade) => {
    setSelectedGrade(grade);
    setIsModalOpen(true);
  };

  const handlePersistData = (formData) => {
    const { id, newValue } = formData;

    const gradeToBeUpdated = allGrades.find(grade => grade.id === id);

    gradeToBeUpdated.value = newValue;
    const isDeleted = gradeToBeUpdated.isDeleted;
    
    if (isDeleted) {
      gradeToBeUpdated.isDeleted = false;
      api.insertGrade(gradeToBeUpdated);
    } else {
      api.updateGrade(gradeToBeUpdated);
    }

    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <h1 className="center">Controle de Notas</h1>

      {isModalOpen &&
        <ModalGrade
          onSave={handlePersistData}
          onClose={handleClose}
          selectedGrade={selectedGrade}
        />}

      {allGrades.length === 0 && <Spinner />}
      {allGrades.length > 0 && (
        <GradesControl
          grades={allGrades}
          onDelete={handleDelete}
          onPersist={handlePersist}
        />
      )}
    </div>
  );
}

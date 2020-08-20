import axios from 'axios';

const API_URL = 'http://localhost:3001/grade/';

const GRADE_VALIDATION = [
  {
    id: 1,
    gradeType: 'Exercícios',
    minValue: 0,
    maxValue: 10,
  },
  {
    id: 2,
    gradeType: 'Trabalho Prático',
    minValue: 0,
    maxValue: 40,
  },
  {
    id: 3,
    gradeType: 'Desafio',
    minValue: 0,
    maxValue: 50,
  },
];

export async function getAllGrades() {
  const res = await axios.get(API_URL);

  const handleGrade = (grade) => ({
    ...grade,
    studentLowerCase: grade.student.toLowerCase(),
    subjectLowerCase: grade.subject.toLowerCase(),
    typeLowerCase: grade.type.toLowerCase(),
    isDeleted: false,
  });

  const grades = res.data.grades.map(handleGrade);

  let allStudents = new Set();
  grades.forEach(grade => allStudents.add(grade.student));
  allStudents = Array.from(allStudents);

  let allSubjects = new Set();
  grades.forEach(grade => allSubjects.add(grade.subject));
  allSubjects = Array.from(allSubjects);

  let allGradeTypes = new Set();
  grades.forEach(grade => allGradeTypes.add(grade.type));
  allGradeTypes = Array.from(allGradeTypes);

  const allCombinations = [];
  allStudents.forEach(student => {
    allSubjects.forEach(subject => {
      allGradeTypes.forEach(type => {
        allCombinations.push({
          student,
          subject,
          type
        });
      });
    });
  });

  const maxId = grades.reduce((maxId, grade) => {
    return maxId < grade.id ? grade.id : maxId
  }, -1);
  let nextId = maxId + 1;

  allCombinations.forEach(({ student, subject, type}) => {
    const hasItem = grades.find(grade => {
      return (
        grade.subject === subject &&
        grade.student === student &&
        grade.type === type
      );
    });

    if (!hasItem) {
      grades.push({
        id: nextId++,
        student, 
        studentLowerCase: student.toLowerCase(),
        subject,
        subjectLowerCase: subject.toLowerCase(),
        type,
        typeLowerCase: type.toLowerCase(),
        value: 0,
        isDeleted: true,
      });
    }
  });

  grades.sort((a, b) => a.typeLowerCase.localeCompare(b.typeLowerCase));
  grades.sort((a, b) => a.subjectLowerCase.localeCompare(b.subjectLowerCase));
  grades.sort((a, b) => a.studentLowerCase.localeCompare(b.studentLowerCase));

  return grades;
}

export async function insertGrade(grade) {
  const response = await axios.post(API_URL, grade);
  return response.data.id;
}

export async function updateGrade(grade) {
  const response = await axios.put(API_URL, grade);
  return response.data;
}

export async function deleteGrade(grade) {
  const response = await axios.delete(API_URL.concat(grade.id));
  return response.data;
}

export function getValidationFromGradeType(gradeType) {
  const { minValue, maxValue } = 
    GRADE_VALIDATION.find(item => item.gradeType === gradeType) || {};

  if (minValue === undefined || maxValue === undefined) {
    return null;
  }

  return {
    minValue: minValue,
    maxValue: maxValue
  };
}
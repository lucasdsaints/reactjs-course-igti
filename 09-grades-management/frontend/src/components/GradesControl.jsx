import React from 'react'
import Action from './Action';

export default function GradesControl({ grades, onDelete, onPersist }) {

  const tableGrades = [];
  let id = 1;

  grades.forEach(grade => {
    const { student, subject } = grade;

    const table = tableGrades.find(table => {
      return table.student === student && table.subject === subject;
    });

    if (!table) {
      tableGrades.push({
        id: id++,
        student,
        subject,
        grades: [grade]
      });
    } else {
      table.grades.push(grade);
    }
  });

  const handleActionClick = (id, type) => {
    const grade = grades.find(grade => grade.id === id);
    if (type === 'delete') {
      onDelete(grade);
      return;
    }

    onPersist(grade);
  }

  return (
    <div className="center">
      {tableGrades.map(({ id, grades }) => {
        const finalGrades = grades.reduce((acc, grade) => acc + grade.value, 0);
        const gradeStyle = finalGrades >= 70 ? styles.goodGrade : styles.badGrade;
        return (
          <table style={styles.table} key={id} className="striped">
            <thead>
              <tr>
                <th style={{ width: '20%' }}>Aluno</th>
                <th style={{ width: '20%' }}>Disciplina</th>
                <th style={{ width: '20%' }}>Avaliação</th>
                <th style={{ width: '20%' }}>Nota</th>
                <th style={{ width: '20%' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {grades.map(({ id, subject, student, type, value, isDeleted }) => (
                <tr key={id}>
                  <td>{student}</td>
                  <td>{subject}</td>
                  <td>{type}</td>
                  <td>{isDeleted ? '-' : value}</td>
                  <td>
                    <Action
                      onActionClick={handleActionClick}
                      id={id}
                      type={isDeleted ? 'add' : 'edit'}
                    />
                    {!isDeleted && (
                      <Action
                        onActionClick={handleActionClick}
                        id={id}
                        type="delete"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td style={{ textAlign: 'right' }}>
                  <strong>Total:</strong>
                </td>
                <td>
                  <span style={gradeStyle}>{finalGrades}</span>
                </td>
              </tr>
            </tfoot>
          </table>
        );
      })}
    </div>
  )
}


const styles = {
  goodGrade: {
    fontWeight: 'bold',
    color: 'green',
  },
  badGrade: {
    fontWeight: 'bold',
    color: 'tomato',
  },
  table: {
    margin: '20px',
    padding: '10px',
    // borderTop: '.8px solid lightgray',
    borderBottom: '.8px solid lightgray',
  },
}
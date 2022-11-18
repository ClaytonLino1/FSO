const Course = ({course}) => {
    return <>
      <Course.Header course={course.name} />
      <Course.Content parts={course.parts} />
      <Course.Total parts={course.parts} />
    </>;
  }


Course.Header = ({ course }) => <h1>{course}</h1>

Course.Total = ({parts}) => {
  const total = 
    parts.reduce((acc, currentValue) => acc + currentValue.exercises, 0);

  return(<strong> total of {total} exercises </strong>
  )
}


Course.Content = ({ parts }) =>  (
  <div>
    {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />
    )}
  </div>
)

const Part = ({name, exercises}) => 
  <p>
    {name} {exercises}
  </p>
  
export default Course;
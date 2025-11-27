import CourseCard from "../CourseCard";

export default function CourseCardExample() {
  return (
    <div className="max-w-xs">
      <CourseCard
        title="Azure DevOps for Beginners"
        url="https://www.udemy.com/course/azure-devops-for-beginners/"
        thumbnail="https://img-c.udemycdn.com/course/480x270/2719300_29b1_3.jpg"
        students={15000}
        rating={4.6}
        platform="udemy"
      />
    </div>
  );
}

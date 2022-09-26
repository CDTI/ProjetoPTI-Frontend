//Types
import { TCourse } from '../../@types/Course';

interface DisciplinesTableProps {
  courses: TCourse[];
  isFilterCollapsed: boolean;
}

export default function CoursesTable({courses, isFilterCollapsed}: DisciplinesTableProps) {
  const defaultThStyle = "p-[16px] font-medium text-left text-white bg-brandBlue sticky top-0 whitespace-nowrap";
  const defaultTdStyle = "leading-relaxed p-[16px] whitespace-nowrap";

  return (
    <div
      className={`flex-1 overflow-y-scroll ${
        isFilterCollapsed ? "max-h-[520px]" : "max-h-[620px]"
      }`}
    >
      <table className="m-auto w-[90%] border-collapse min-w-[600px]">
        <thead>
          <tr>
            <th
              className={`${defaultThStyle} w-[40%] rounded-tl-lg pl-[1.5rem]`}
            >
              Nome
            </th>
            <th className={`${defaultThStyle} `}>Código SIAA</th>
            <th className={`${defaultThStyle}`}>Código MEC</th>
            <th
              className={`${defaultThStyle}  rounded-tr-lg pr-[1.5rem]`}
            >
              Unidades
            </th>
          </tr>
        </thead>
        <tbody>
          {courses &&
            courses.map((course, index) => (
              <tr
                key={course.codigo_mec}
                className={index % 2 == 0 ? "bg-white" : "bg-background"}
              >
                <td className={`${defaultTdStyle} pl-[1.5rem]`}>
                  {course.nome}
                </td>
                <td className={defaultTdStyle}>{course.codigo_siaa}</td>
                <td className={defaultTdStyle}>{course.codigo_mec}</td>
                <td className={`${defaultTdStyle} pr-[1.5rem] w-[30%]`}>
                  {course.unidades.map((campus, index) => {
                    if (course.unidades.length == index + 1) {

                      return (
                        <span key={campus}>{campus}</span>
                      );
                    } else {
                      return (
                        <span key={campus}>
                          {campus + ", "}
                        </span>
                      );
                    }
                  })}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

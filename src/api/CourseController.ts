/* eslint-disable no-use-before-define */
import { toast } from "react-toastify";
import { TCourse, TCourseSelect, TCourseCreate } from "../@types/Course";
import { api } from "../services/axios";

export class CourseController {
  private static courseController: CourseController;

  public static getInstance(): CourseController {
    if (this.courseController == null) {
      this.courseController = new CourseController();
    }
    return this.courseController;
  }

  public get() {}
  public async getAll(): Promise<TCourse[]> {
    return await api
      .get("/course")
      .then((res) => {
        return res.data.courses;
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  public async getAllForSelect(): Promise<TCourseSelect[]> {
    return await api
      .get("/course")
      .then((res) => {
        const coursesForSelect = res.data.courses.map((course: TCourse) => {
          return {
            value: course.codigo_mec,
            label: course.nome,
          };
        });
        return coursesForSelect;
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  public async create(course: TCourseCreate): Promise<void> {
    return await api
      .post("/course", course)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err);
      });
  }

  public delete() {}
  public update() {}
}

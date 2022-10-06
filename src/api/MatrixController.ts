/* eslint-disable no-use-before-define */
import { toast } from "react-toastify";
import { TDiscipline } from "../@types/Discipline";
import { TMatrix, TUploadedMatrix } from "../@types/Matrix";
import { api } from "../services/axios";

export class MatrixController {
  private static matrixController: MatrixController;

  public static getInstance(): MatrixController {
    if (this.matrixController == null) {
      this.matrixController = new MatrixController();
    }
    return this.matrixController;
  }

  public async uploadMatrix(data: FormData): Promise<TUploadedMatrix> {
    return await api
      .post("/matrix", data)
      .then((res) => {
        return res.data.matriz;
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return {};
      });
  }

  public async getMatrixesOfCourse(courseId: string): Promise<TMatrix[]> {
    return await api
      .get(`/matrix/${courseId}`)
      .then((res) => {
        return res.data.matrizes;
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  public async getDisciplines(matrixId: string): Promise<TDiscipline[]> {
    return await api
      .get(`/matrix/disciplines/${matrixId}`)
      .then((res) => {
        return res.data.disciplinas;
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }
}

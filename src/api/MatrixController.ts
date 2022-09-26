import { toast } from "react-toastify";
import { TMatrix } from "../@types/Matrix";
import { api } from "../services/axios";

export class MatrixController {
  private static matrixController : MatrixController;
  
  public static getInstance() : MatrixController{
    if(this.matrixController == null) {
      this.matrixController = new MatrixController();
    }
    return this.matrixController;
  }

  public async uploadMatrix(data: FormData) : Promise<TMatrix> {
    return await api.post('/matrix', data).then((res) => {
      if(res.data.matriz.disciplinas.length === 0) toast.error("Matriz duplicada na base de dados.")
      return res.data.matriz;
    }).catch(err => {
      toast.error(err.message)
    });
  }

  public async getMatrixes(courseId: string) : Promise<TMatrix> {
    return await api.get('/matrix', {params: {id_curso: courseId}}).then((res) => {
      return res.data.matriz;
    }).catch(err => {
      toast.error(err.message)
    });
  }
  
}

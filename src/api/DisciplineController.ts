import { TDiscipline, TDisciplineCreate } from "../@types/Discipline";
import { toast } from 'react-toastify';
import { api } from "../services/axios";

export class DisciplineController {
  private static disciplineController : DisciplineController;
  
  public static getInstance() : DisciplineController{
    if(this.disciplineController == null) {
      this.disciplineController = new DisciplineController();
    }
    return this.disciplineController;
  }

  public get() {}
  public async getAll() : Promise<TDiscipline[]> {
    return await api.get('/discipline').then(res => {
      return res.data.disciplines;
    }).catch(err => {
      alert(err.message);
    });
  }
  
  public async create(discipline: TDisciplineCreate) : Promise<void> {
    return await api.post('/discipline', discipline).then(res => {
      toast.success(res.data.message);
    }).catch(err => {
      toast.error(err);
    });
  }
  public delete() {}
  public update() {}
}


import { TCampus } from "../@types/Campus";
import { api } from "../services/axios";

export class CampusController {
  private static campusController : CampusController;
  
  public static getInstance() : CampusController{
    if(this.campusController == null) {
      this.campusController = new CampusController();
    }
    return this.campusController;
  }

  public async getAll() : Promise<TCampus[]> {
    return await api.get('/campus').then(res => {
      return res.data.campus;
    }).catch(err => {
      alert(err.message);
    });
  }
 
}

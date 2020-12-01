
import API from './API'

class OemService {
    static async getAll() {
        const response = await API().get("/")
        console.log(response.data.oem);
        return response.data.oem;
    }
    static async addOem(oem) {
      
        const response = await API().post("/add-oem",oem)
        console.log(response);
        return response;
    }
    static async deleteOem(id){
        console.log(id);
        const response=await API().post("/delete-oem/"+id)
        console.log(response);
        return response;
    }
}

export default OemService;
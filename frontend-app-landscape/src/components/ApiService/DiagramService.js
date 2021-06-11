import axios from "axios";

const DIAGRAM_REST_API_URL = "http://localhost:8080/api/";

class DiagramService {

    getDiagramByName(name) {
        return axios.get(DIAGRAM_REST_API_URL+'diagram');
      }
    
      createDiagram(diagram) {
        return axios.post(DIAGRAM_REST_API_URL +'diagram', diagram);
      }

      updateDiagramByName(name,diagram){
        return axios.put(DIAGRAM_REST_API_URL+'diagram/'+name,diagram)
      }

}

export default new DiagramService()
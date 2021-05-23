import axios from "axios";

const DIAGRAM_REST_API_URL = "http://localhost:8080/api/";

class DiagramVisualService {

    getDiagramVisual() {
        return axios.get(DIAGRAM_REST_API_URL);
      }
    
      createDiagramVisual(diagram) {
        return axios.post(DIAGRAM_REST_API_URL, diagram);
      }

}

export default new DiagramVisualService()
import axios from "axios";

const LINK_REST_API_URL = "http://localhost:8080/api/";

class LinkService {

    getLinks() {
        return axios.get(LINK_REST_API_URL+ "link");
      }
    
      createLinks(links) {
        return axios.post(LINK_REST_API_URL+"link", links);
      }
      updateLinksById(id,links){
        return axios.put(LINK_REST_API_URL+"link/"+id,links)
      }

}

export default new LinkService()
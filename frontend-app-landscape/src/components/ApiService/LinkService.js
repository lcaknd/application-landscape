import axios from "axios";

const LINK_REST_API_URL = "http://localhost:8080/api/";

class LinkService {

    getLinks() {
        return axios.get(LINK_REST_API_URL);
      }
    
      createLinks(links) {
        return axios.post(LINK_REST_API_URL, links);
      }

}

export default new LinkService()
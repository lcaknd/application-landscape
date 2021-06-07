import axios from "axios";

const BUSINESS_CAPABILITIES_REST_API_URL = "http://localhost:8080/api/";

class BusinessCapabilityService {

    getBusinessCapabilities() {
        return axios.get(BUSINESS_CAPABILITIES_REST_API_URL+"businessCapabilities");
      }
    
      createBusinessCapabilities(businessCapabilities) {
        return axios.post(BUSINESS_CAPABILITIES_REST_API_URL, businessCapabilities);
      }

}

export default new BusinessCapabilityService()
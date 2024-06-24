import axios from 'axios'
const REQUEST_XML = 'http://localhost:8081/api/submit';
const RESPONSE_XML ='http://localhost:8080/ndcoffer/airShoppingRequest';
const RESPONSE_JsonDTO = 'http://localhost:8081/api/mapAirShoppingResDTO';

 
class ApiService {
 
     getXML(body) {
        console.log("from getxml service class body check",body);
        return  axios.post(REQUEST_XML,body);
    }
    async postXML(xmlData) {
         return await axios.post(RESPONSE_XML,xmlData, {
            headers: {
                'Content-Type': 'application/xml',
            },
        });
    
           

        // const response =  axios.post(RESPONSE_XML, xmlData); // Use xmlData parameter instead of this.state.xml
        // const xmlDataResponse = response.data; // Get the XML data from the response
        // const x2js = new X2JS();
        // const jsonData = x2js.xml2js(xmlDataResponse);
        // return jsonData;
    }
    async postXML2(xmlData) {
        return await axios.post(RESPONSE_JsonDTO,xmlData, {
           headers: {
               'Content-Type': 'application/xml',
           },
       });
    }
   
}
 
export default new ApiService();
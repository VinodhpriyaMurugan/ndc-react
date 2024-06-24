import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/Grid.css';
import ApiService from './Services/ApiService';
import flightImg from './images/flight.png';
import bookNowImg from './images/Booknow.png';
import bagImg from './images/baggage.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcase } from '@fortawesome/free-solid-svg-icons';

class NdcGridComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jsonData: [],
            loading: true,
            body: props.formData
        };
    }

    componentDidMount() {
        this.handleGetXML();
    }

    handleGetXML = async () => {
        console.log('Button clicked');
        console.log('from ndcgridcomponent', this.state.body);
        this.setState({ loading: true }); // Set loading to true when the API call starts
        try {
            // Make the API calls sequentially
            const response1 = await ApiService.getXML(this.state.body);
            console.log('NDC Request XML:', response1);

            const response2 = await ApiService.postXML(response1.data);
            console.log('NDC Response XML:', response2);

            const response3 = await ApiService.postXML2(response2.data);
            console.log('UI DTO JSON:', response3);

            const jsonData = response3.data;
            if (jsonData !== undefined) {
                this.setState({
                    jsonData: jsonData,
                });
                //console.log('Final JSON:', jsonData);
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle errors for each individual API call
        } finally {
            this.setState({ loading: false }); // Set loading to false in all cases
        }
        //console.log('Button clicked end');
    };

    render() {
        const { jsonData, loading } = this.state;

        return (
            <div>
                <div className="container">
                    {!loading ? (
                        <div>
                            {jsonData && jsonData.offers && jsonData.offers.length > 0 ? (
                                jsonData.offers.map((offr, index) => (
                                    <table key={index} className="table table-striped">
                                        <tbody>
                                            <tr>
                                                <td className='tdJourney'>
                                                    <table className='tableInner'>
                                                                                                           
                                                {offr.journeys.map((journey, jIndex) => (
                                                    journey.segments.map((seg, sIndex) => (
                                                        <React.Fragment key={sIndex}>
                                                            <tr className='trborder'>   
                                                            <td className='tdWidth'>
                                                            <div className="smallFontLeft"><img src={flightImg}></img>{seg.marketing_carrier_name}</div>
                                                            <div className="smallFontLeft">Flight number: {seg.marketingCarrierFlightNumberText}</div>
                                                            <div></div>
                                                                <div>
                                                                <span className="OrgDes">{seg.origin}</span>
                                                                <span> → </span>
                                                                <span className="OrgDes">{seg.destination}</span>
                                                                </div>
                                                                <div className="smallFontLeft">
                                                                <span >{seg.departureDate}</span>
                                                                <span> → </span>
                                                                <span className="smallFontLeft">{seg.arrivalDate}</span>
                                                                </div>
                                                                <div className="smallFontLeft">Duration: {seg.duration}</div>
                                                                
                                                                <div className="smallFontLeft">
                                                                   <FontAwesomeIcon icon={faSuitcase} /> { journey.baggages.map((bag, bindex) => ( <span>{bag.totalQuantity} {bag.typeCode} </span>)) }
                                                                </div>
                                                                
                                                            </td>
                                                            <td>
                                                                <span className="subtitle">{seg.cabinClass}</span>
                                                            </td>
                                                            <td>
                                                                
                                                                <div className="smallFontLeft">Departure</div>
                                                                <div className="smallFontLeft">Airport: {seg.departureStationName}</div>
                                                                <div className="smallFontLeft">Terminal: {seg.departureTerminalName}</div>
                                                            </td>
                                                            <td>
                                                            <div className="smallFontLeft">Arrival</div>                        
                                                                <div className="smallFontLeft"> Airport: {seg.arrivalStationName}</div>
                                                                <div className="smallFontLeft">Terminal: {seg.arrivalTerminalName}</div>
                                                            </td>
                                                            
                                                            </tr>
                                                        </React.Fragment>
                                                    ))
                                                ))}
                                                  
                                                    </table>
                                                </td>
                                                <td className='tdCenter'>
                                                    <div title="Total Fare including Tax" className="boldFont">
                                                        {offr.curCode} {offr.totalAmount}
                                                    </div>
                                                    <div title="Base Fare" className="smallFontCenter">
                                                        Base Fare: {offr.bcurCode} {offr.baseAmount}
                                                    </div>
                                                    <div>
                                                    <a href="#"><img className='bookimg' src={bookNowImg}></img></a>
                                                    </div>
                                                </td>
                                                
                                            </tr>
                                        </tbody>
                                    </table>
                                ))
                            ) : (
                                <p>we are facing some technical  issue please try after some time</p>
                            )}
                        </div>
                    ) : (
                        <div className="spinner-border" role="status">
                                <span className="sr-only"></span>
                              </div>
                    )}
                </div>
            </div>
        );
    }
}

export default NdcGridComponent;

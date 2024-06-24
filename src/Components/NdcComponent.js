import React from 'react';
//import ApiService from '../Services/ApiService';
import X2JS from 'x2js'; 
 
class NdcComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            xml : ``,
            jsonResponse : ``,
            jsonData : ''
        }
    }
 
    handleClickButton1 = () => {
        console.log('Button 1 clicked');
        ApiService.getXML().then((response) => {
            this.setState({ xml: response.data})
            console.log(response.data)
        });
    }

    handleClickButton2 = () => {
        console.log('Button 2 clicked');
            
        ApiService.postXML(this.state.xml).then((response)  => {
            console.log('respone ----' , response.data)
            this.setState({ jsonResponse: response.data})    
            const x2js = new X2JS();
            const jsonFinal = x2js.xml2js(response.data);
            console.log("json conversion",jsonFinal)
           // this.setState({ jsonData: x2js.xml2js(response.data)})  
           this.setState({jsonData: jsonFinal.data})
            console.log('final json  ', this.state.jsonData)
        })


    }

    render (){
        return (

            <div>       
                <button onClick={this.handleClickButton1}>Button 1</button>
                <button onClick={this.handleClickButton2}>Button 2</button>
                 <p>
                    <pre> <span>{this.state.xml}</span> </pre>
                 </p>
                 <p>
                    <pre><span>{this.state.jsonResponse}</span></pre>
                 </p>
            </div>
 
        )

    }

}
 
export default NdcComponent


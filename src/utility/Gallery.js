import React,{Component} from 'react';
import {Modal} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import SimpleReactFileUpload from './SimpleReactFileUpload';
import Services from '../services/user.services';
import '../css/modal.css';
import utility from '../utility/utility';
import {CopyToClipboard} from 'react-copy-to-clipboard';
class Gallery extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.handleShow = this.handleShow.bind(this);
      this.handleHide = this.handleHide.bind(this);

      this.state = {
        show: true,
        images_list:[],
        image_url:'',
        file:null,
        copied: false,
      };
      /*File Upload */
      this.onFormSubmit = this.onFormSubmit.bind(this)
      this.onChange = this.onChange.bind(this)
      //this.fileUpload = this.fileUpload.bind(this)
    }
  /*Image Upload */
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    utility.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
      this.imageUploadSuccess();
    })
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }

    handleShow() {
      this.setState({ show: true });
    }

    handleHide() {
      this.setState({ show: false });
    }
    imageUploadSuccess(){
      Services.imageList().then((response)=>{
        if(response.data.success==true){
            this.setState({images_list:response.data.data});
            console.log(this.state.images_list);
        }
    }).catch((error)=>{
        console.log(error)
    })
    }
    componentDidMount(){
      /*Image List */
      this.imageUploadSuccess();

  }
  onCopy = () => {
    this.setState({copied: true});
    setTimeout(function() {this.setState({copied: false});}.bind(this),3000);
  };

    render() {
      return (
        <React.Fragment>
        <ButtonToolbar>
          {/* <Button bsStyle="primary" onClick={this.handleShow}>
            Gallery
          </Button> */}


            <Modal.Header>
              <Modal.Title id="contained-modal-title-lg">
               Gallery {this.state.copied ? <span style={{color: 'green'}}>Copied.</span> : null}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={this.onFormSubmit}>
              <h5>File Upload</h5>
              <input type="file" onChange={this.onChange} />
              <button type="submit">Upload</button>
            </form>
                    {
                        this.state.images_list.map(items =>(
                          <CopyToClipboard text={items.imagePath} onCopy={this.onCopy.bind(this)}>
                            <img  style={{"width":"120px","height":"120px","marginTop":"10px","cursor":"pointer"}} src={items.imagePath}/>
                          </CopyToClipboard>
                            
                        ))
                    }
            </Modal.Body>
            <Modal.Footer>
              {/*<Button onClick={this.handleHide}>Close</Button>*/}
            </Modal.Footer>
      
        </ButtonToolbar>
        </React.Fragment>
      );
    }
  }

  export default Gallery

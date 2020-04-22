import React,{Component} from 'react';

class Footer extends Component{
    render(){
        return(
            <React.Fragment>
                <footer class="sticky-footer">
                    <div class="container my-auto">
                    <div class="copyright text-center my-auto">
                        <span>Copyright © Your Website 2019</span>
                    </div>
                    </div>
                </footer>
            </React.Fragment>
        )
    }
}

export default Footer;
import React,{Component} from 'react';
import Layout from './Layout';
import LayoutNoWrap from './LayoutNoWrap';
class MainLayout extends Component{
    state={
        "path":window.location.pathname
    }
    
    render(){
        if(this.state.path=='/'){
            return(
                <LayoutNoWrap/>
            )
        }else{
            return(
              <Layout/>
            )
        }
        
    }
}

export default MainLayout
import * as React from 'react';
import {Button} from 'antd';
import DocumentTitle from 'react-document-title';


class Home extends React.Component {
    constructor(props:any) {
        super(props);
    }
    render() {
        return ( 
        <DocumentTitle title={'Unicorn'}>
            <Button>hello~</Button>
        </DocumentTitle>
        )
        
        
    }
}

export default Home;
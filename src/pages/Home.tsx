import * as React from 'react';
import {Modal,Button} from 'antd';
import DocumentTitle from 'react-document-title';
import '@/layout/home.less';



class Home extends React.Component {
    constructor(props:any) {
        super(props); 
        this.state ={
            isModalVisible:false
        }  
    }
    showModal = () => {
        this.setState(
            {
                isModalVisible:true
            }
        )  
      };
    
    handleOk = () => {
        this.setState(
            {
                isModalVisible:false
            }
        )  

        
      };
    
    handleCancel = () => {
        this.setState(
            {
                isModalVisible:false
            }
        )  
      };
    render() {
        return ( 
        <DocumentTitle title={'Unicorn'}>
        <div className="home-page">
            <div className="flex">
                <Button className="leave-button">LeaveAll</Button>
                <Button className="create-button" onClick={this.showModal}>CreateRoom</Button>
                <Modal title="Basic Modal" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={ this.handleCancel}>
                    <form>
                        <label>Group name:</label><br />
                        <input type="text" placeholder="group name"/><br />

                        <label>Group size:</label><br />
                        <input type="text" placeholder="group size"/><br />
                        
                        <label>Public/Private:</label><br />
                        <select>
                            <option value ="public">public</option>
                            <option value ="private">private</option>
                        </select>
                        <br />
                        <label>*you will be set as admin</label><br />
                    </form> 
                </Modal>
                <Button className="profile-button">Profile</Button>
                <Button className="logout-button">LogOut</Button>
            </div>
            <div className="chatroom">
                <div className="room-list">                    
                </div>
                <div className="room-window">
                </div>
            </div>
        </div>
        </DocumentTitle>
        )
        
        
    }
}

export default Home;
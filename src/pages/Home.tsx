import * as React from 'react';
import {Button, Col, Collapse, Menu, Row,Modal, Input,Tooltip,Form} from 'antd';
import DocumentTitle from 'react-document-title';
import {Link} from 'react-router-dom';
import logo from "@/assets/uu.jpg";
import '@/layout/home.less';
import MessageInput from '@/components/MessageInput';
import Message from '@/components/Message';
import { StopOutlined, CloseCircleOutlined, UserOutlined } from '@ant-design/icons';
//import io from 'socket.io-client'
//import { ServerResponse } from 'http';

const { Panel } = Collapse;

const socketUrl = "http://localhost:9092"
class Home extends React.Component<any,any> {
    formRef = React.createRef();

    constructor(props: any) {
        super(props);

        //var userName = 'user' + Math.floor((Math.random() * 1000) + 1);
        //var socket =SocketIO("http://localhost:9092",{
        //"transports": ['websocket']
        //});
        this.state = {
            socket: 0,
            value_joined_rooms: 1,
            value_all_rooms: 1,
            in_which_room: 1,
            room_title: "No Room connected. Please Join a Room",
            messages: [],

            isModalVisible: false,
            isModalInviteVisible: false,
            allRoomCardList: [],
            joinedRoomCardList: [],
            inviteUserCardList: [],
        };

    }

    handleJoinRoom = (item)=>{
        let dataJoinedRooms = this.state.joinedRoomCardList;

        const found= dataJoinedRooms.findIndex(element => element.newchatroomName === item.newchatroomName);
        if(found === -1)
        {
            dataJoinedRooms.push(item);
        }
        //dataJoinedRooms.splice(id, 1);
        this.setState({
            joinedRoomCardList: dataJoinedRooms
        })

    }


    handleNewRoomOk = () => {
        let datajoinedRooms = this.state.joinedRoomCardList;
        datajoinedRooms.push(this.formRef.current.getFieldsValue())

        let dataallRooms = this.state.allRoomCardList;
        dataallRooms.push(this.formRef.current.getFieldsValue())

        this.setState({
            isModalVisible: false,
            joinedRoomCardList: datajoinedRooms,
            allRoomCardList: dataallRooms
        })
        this.formRef.current.resetFields()
    }
    handleNewRoomCancel = () => {
        this.setState({
            isModalVisible: false
        })
        this.formRef.current.resetFields()
    }
    addNewRoom = () => {
        this.setState({
            isModalVisible: true
        })
    }
    deleteJoinedRoom = (id) => {
        let dataJoinedRooms = this.state.joinedRoomCardList;
        dataJoinedRooms.splice(id, 1);
        this.setState({
            joinedRoomCardList: dataJoinedRooms
        })
    }

    deleteAllRoom = (id) => {
        let dataAllRooms = this.state.allRoomCardList;
        dataAllRooms.splice(id, 1);
        this.setState({
            allRoomCardList: dataAllRooms
        })
    }

    handleNewUserOk = () => {
        let datainviteUsers = this.state.inviteUserCardList;
        datainviteUsers.push(this.formRef.current.getFieldsValue())
        this.setState({
            isModalInviteVisible: false,
            inviteUserCardList: datainviteUsers
        })
    }
    handleNewUserCancel = () => {
        this.setState({
            isModalInviteVisible: false
        })
        this.formRef.current.resetFields()
    }
    addNewUser = () => {
        this.setState({
            isModalInviteVisible: true
        })
    }
    deleteUser = (id) => {
        let datainviteUsers = this.state.inviteUserCardList;
        datainviteUsers.splice(id, 1);
        this.setState({
            inviteUserCardList: datainviteUsers
        })
    }

    
    
    handleConnect = (name) => {
        this.setState( {room_title: name});
    }
    
    
    onChange_JoinedRoom = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value_joined_rooms: e.target.value,
        });
    };

    store_messages = (value)=> {
        let arr=[...this.state.messages];
        arr=[...arr,value];
        this.setState({messages:arr});
    }

    onChange_AllRooms = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value_all_rooms: e.target.value,
        });
    };

    render() {
        const { value_joined_rooms,value_all_rooms} = this.state;
        const { allRoomCardList, joinedRoomCardList, inviteUserCardList } = this.state;
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };

        return ( 
        <DocumentTitle title={'Unicorn'}>
            <div className="home-container">
                <div className="pageHeader">
                    <Menu key="1" mode="horizontal" className="home-menu">
                        <Menu.Item>
                            <img src={ logo } alt="logo"/>
                            <span>Unicorn</span>
                        </Menu.Item>
                        <Menu.Item><Link to='/Profile'>Profile</Link></Menu.Item>
                        <Menu.Item><Link to=''>Log Out</Link></Menu.Item>
                    </Menu>
                </div>
                <div className="home-box">
                    <Row>
                        <Col className="chatroom-list">
                            <div className="chatroom-joined">
                                <Collapse className="collapse-chatroom-joined"
                                          bordered={false}
                                          defaultActiveKey={['1']}
                                >
                                    <Panel header="Joined Rooms" key="1" className="site-collapse-custom-panel">
                                        {
                                            joinedRoomCardList?.length ?
                                                <div className="site-card-border-less-wrapper">
                                                    {
                                                        joinedRoomCardList?.map((item, id) => (
                                                            <div key={id} style={{marginTop:'5px'}}>
                                                                <Row>
                                                                    <Col>
                                                                        <div style={{border: '1px solid #ccc', backgroundColor: '#fefefe', width:'125px', height:'30px', textAlign:'center'}}>{item.newchatroomName}</div>
                                                                    </Col>
                                                                    <Col>
                                                                        <Button type="primary" onClick= {()=>{this.handleConnect(item.newchatroomName)}} danger style={{height: '30px', marginLeft:'5px'} }>Connect</Button>
                                                                    </Col>
                                                                    <Col>
                                                                        <Button type="primary" danger onClick={() => this.deleteJoinedRoom(id)} style={{height: '30px', marginLeft:'5px'}}>Leave</Button>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        ))
                                                    }
                                                    <Button onClick={()=>this.setState({joinedRoomCardList:[]})} style={{width:'290px', marginTop:'5px'}}>Leave All</Button>
                                                </div>
                                                :
                                                null
                                        }
                                    </Panel>
                                </Collapse>
                            </div>
                            <div className="chatroom-all-rooms">
                                <Collapse className="collapse-chatroom-all"
                                          bordered={false}
                                          defaultActiveKey={['1']}
                                >
                                    <Panel header="All Rooms" key="1" className="panel-chatroom-all">
                                        <Button onClick={this.addNewRoom} style={{width:'290px'}}>Create New Room</Button>
                                        <Modal title="Create New Room" visible={this.state.isModalVisible} onOk={this.handleNewRoomOk} onCancel={this.handleNewRoomCancel}>

                                            <Form {...layout} ref={this.formRef} name="control-ref">
                                                <Form.Item name="newchatroomName" label="ChatRoom Name">
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item name="newchatroomType" label="ChatRoom Type">
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item name="newchatroomDescription" label="ChatRoom Description">
                                                    <Input />
                                                </Form.Item>
                                            </Form>
                                        </Modal>
                                        {
                                            allRoomCardList?.length ?
                                                <div className="site-card-border-less-wrapper">
                                                    {
                                                        allRoomCardList?.map((item, id) => (
                                                            <div key={id} style={{marginTop:'5px'}}>
                                                                <Row>
                                                                    <Col>
                                                                        <div style={{border: '1px solid #ccc', backgroundColor: '#fefefe', width:'215px', height:'30px', textAlign:'center'}}>{item.newchatroomName}</div>
                                                                    </Col>
                                                                    <Col>
                                                                        <Button type="primary" danger onClick={() => this.handleJoinRoom(item)} style={{height: '30px', marginLeft:'5px'}}>Join</Button>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                :
                                                null
                                        }
                                    </Panel>
                                </Collapse>
                            </div>
                            <div className="chatroom-all-users">
                                <Collapse className="collapse-chatroom-all"
                                          bordered={false}
                                          defaultActiveKey={['1']}
                                >
                                    <Panel header="All Users" key="1" className="panel-chatroom-all">
                                        <Button className="panel-chatroom-invite-button" style={{width:'290px'}} onClick={this.addNewUser}>Invite</Button>
                                        <Modal title="Invite User" visible={this.state.isModalInviteVisible} onOk={this.handleNewUserOk} onCancel={this.handleNewUserCancel}>
                                        <Form {...layout} ref={this.formRef} name="control-ref">
                                            <Form.Item
                                                name="inviteName"
                                                label="UserName"
                                            >
                                                <Input placeholder="User1,User2..." />
                                            </Form.Item>
                                        </Form>
                                        </Modal>
                                        {
                                            inviteUserCardList?.length ?
                                                <div className="site-card-border-less-wrapper">
                                                    {
                                                        inviteUserCardList?.map((item, id) => (
                                                            <Row>
                                                                <Col>
                                                                    <div style={{border: '1px solid #ccc', backgroundColor: '#fefefe', width:'120px', height:'30px', textAlign:'center',marginTop:'5px'}}>{item.inviteName}</div>
                                                                </Col>
                                                                <Col>
                                                                    <Tooltip title="Kick">
                                                                        <Button type="primary" shape="circle" onClick={() => this.deleteUser(id)} style={{marginLeft:'20px'}} icon={<CloseCircleOutlined />} />
                                                                    </Tooltip>
                                                                </Col>
                                                                <Col>
                                                                    <Tooltip title="Ban">
                                                                        <Button type="primary" shape="circle" style={{marginLeft:'20px'}} icon={<StopOutlined />} />
                                                                    </Tooltip>
                                                                </Col>
                                                                <Col>
                                                                    <Tooltip title="Set Admin">
                                                                        <Button type="primary" shape="circle" style={{marginLeft:'20px'}} icon={<UserOutlined />} />
                                                                    </Tooltip>
                                                                </Col>
                                                            </Row>
                                                        ))
                                                    }
                                                </div>
                                                :
                                                null
                                        }
                                    </Panel>
                                </Collapse>
                            </div>
                            

                        </Col>
                        <Col className="chatroom-area">
                            <div className="chatroom-area-notification-error">
                                <h2>{this.state.room_title}</h2>
                            </div>
                            <Message messages={this.state.messages} />
                            <MessageInput socket={this.store_messages} addUser={this.addNewUser} />
                        </Col>
                    </Row>

                </div>
            </div>
        </DocumentTitle>
        )
        
        
    }
}

export default Home;//
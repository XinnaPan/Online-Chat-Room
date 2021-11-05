import * as React from 'react';
import {Button, Col, Collapse, Menu, Row,Radio, Space, Input} from 'antd';
import DocumentTitle from 'react-document-title';
import {Link} from 'react-router-dom';
import logo from "@/assets/uu.jpg";
import '@/layout/home.less';
import MessageInput from '@/components/MessageInput';
import Message from '@/components/Message';

import io from 'socket.io-client'

const { Panel } = Collapse;

const socketUrl = "http://localhost:9092"
class Home extends React.Component {

    constructor(props:any) {
        super(props);

        //var userName = 'user' + Math.floor((Math.random() * 1000) + 1);
        //var socket =SocketIO("http://localhost:9092",{
            //"transports": ['websocket']
         //});
        this.state= {
            socket: null,
            value: 1
        };
        
    }

    componentWillMount() {
		
		this.initSocket()
	}

	initSocket = ()=>{
		const socket = io(socketUrl,{
            "transports": ['websocket']
         });

		socket.on('connect', ()=>{
			console.log("Connected");
		})
		
		this.setState({socket})
	}

    handleConnect =() => {
        
    }

    
    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const {value} = this.state;
        return ( 
        <DocumentTitle title={'Unicorn'}>
            <div className="home-container">
                <div className="pageHeader">
                    <Menu key={""} mode="horizontal" className="home-menu">
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
                                        <Radio.Group onChange={this.onChange} value={value}>
                                            <Space direction="vertical">
                                                <Radio value={1}>Option A</Radio>
                                                <Radio value={2}>Option B</Radio>
                                                <Radio value={3}>Option C</Radio>
                                                <Radio value={4}>
                                                    More...
                                                    {value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
                                                </Radio>
                                                <Space>
                                                    <Button >Connect</Button>
                                                    <Button>Leave</Button>
                                                    <Button>Leave All</Button>
                                                </Space>
                                            </Space>

                                        </Radio.Group>
                                    </Panel>
                                </Collapse>
                            </div>
                            <div className="chatroom-all-rooms">
                                <Collapse className="collapse-chatroom-all"
                                          bordered={false}
                                          defaultActiveKey={['1']}
                                >
                                    <Panel header="All Rooms" key="1" className="panel-chatroom-all">
                                        <Radio.Group onChange={this.onChange} value={value}>
                                            <Space direction="vertical">
                                                <Radio value={1}>Option A</Radio>
                                                <Radio value={2}>Option B</Radio>
                                                <Radio value={3}>Option C</Radio>
                                                <Radio value={4}>
                                                    More...
                                                    {value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
                                                </Radio>
                                                <Space>
                                                    <Button>Create New Room</Button>
                                                </Space>
                                            </Space>

                                        </Radio.Group>
                                    </Panel>
                                </Collapse>
                            </div>
                            <div className="chatroom-all-users">
                                <Collapse className="collapse-chatroom-all"
                                          bordered={false}
                                          defaultActiveKey={['1']}
                                >
                                    <Panel header="All Users" key="1" className="panel-chatroom-all">
                                        <Radio.Group onChange={this.onChange} value={value}>
                                            <Space direction="vertical">
                                                <Radio value={1}>Option A</Radio>
                                                <Radio value={2}>Option B</Radio>
                                                <Radio value={3}>Option C</Radio>
                                                <Radio value={4}>
                                                    More...
                                                    {value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
                                                </Radio>
                                                <Space>
                                                    <Button>Ban</Button>
                                                    <Button>Warn</Button>
                                                    <Button>Kick</Button>
                                                    <Button>Set Admin</Button>
                                                </Space>
                                            </Space>

                                        </Radio.Group>

                                    </Panel>
                                </Collapse>
                            </div>

                        </Col>
                        <Col className="chatroom-area">
                            <div className="chatroom-area-notification-error">
                                <h2>No Room connected. Please Join a Room</h2>
                            </div>

                            <Message socket={this.state.socket} />
                            <MessageInput socket={this.state.socket} />
                        </Col>
                    </Row>

                </div>
            </div>
        </DocumentTitle>
        )
        
        
    }
}

export default Home;
import React, { useState } from 'react';
import '@/layout/home.less';
import {Button,Select} from 'antd';

const { Option } = Select;


function onChange(value) {
    console.log(`selected ${value}`);
}

function onBlur() {
    console.log('blur');
}

function onFocus() {
    console.log('focus');
}

function onSearch(val) {
    console.log('search:', val);
}

const NewMessage = ({socket}) => {
  const [value, setValue] = useState('');
  const submitForm = (e) => {
    e.preventDefault();
    socket.emit('chat', value);
    setValue('');
  };

  return (  
    <div className="chatroom-area-send-container">
      <div className="chatroom-area-send-user">
        <span><b>Send to:</b></span>
        <Select
            showSearch
            style={{ width: 150 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            <Option value="all">All Users</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
        </Select>

        <Button className="chatroom-area-send-button" type="primary" onClick={submitForm}>Send</Button>
        <Button className="chatroom-area-invite-button" type="primary">Invite</Button>
      </div>
      <textarea className="chatroom-area-send-content" placeholder="type your message"  value={value} onChange={(e) => {
          setValue(e.currentTarget.value);
        }} />
    </div>
  );
};

export default NewMessage;
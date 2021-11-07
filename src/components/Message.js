import React, { useEffect, useState } from 'react';
import '@/layout/home.less';
import {Button,Tooltip} from 'antd';


//const NewMessage = ({socket}) => {
const Messages=({messages})=> {
 
  return (
    <div className="chatroom-area-chatbox-container">
      <div className="chatroom-area-chatbox">
      {

          messages.map((item) => {
            return (
              <ul>
              <Tooltip placement="topLeft" title="Recall">
                <Button>{item}</Button>
              </Tooltip>
              </ul>
            )
          })
   
      }
      </div>
    </div>

  );
}

export default Messages;
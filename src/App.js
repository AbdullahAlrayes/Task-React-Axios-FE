import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ChatRoom from './components/ChatRoom';
import ChatRoomsList from './components/ChatRoomsList';
import { Route, Switch } from 'react-router';
import axios from 'axios';

const baseUrl = 'https://coded-task-axios-be.herokuapp.com/rooms';

function App() {
  const [rooms, setRooms] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(baseUrl);
      setRooms(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createRoom = async (newRoom) => {
    try {
      const response = await axios.post(baseUrl, newRoom);
      setRooms([...rooms, response.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRoom = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/${id}`);
      setRooms(() => {
        return rooms.filter((item) => item.id !== id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateRoom = async (obj) => {
    console.log('triggered');
    try {
      const response = await axios.put(`${baseUrl}/${obj.id}`, obj);
      const newRooms = rooms.map((item) => (item.id === obj.id ? obj : item));
      setRooms(newRooms);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="__main">
      <div className="main__chatbody">
        <Switch>
          <Route path="/room/:roomSlug">
            <ChatRoom rooms={rooms} />
          </Route>
          <Route exact path="/">
            <center>
              <ChatRoomsList
                rooms={rooms}
                updateRoom={updateRoom}
                createRoom={createRoom}
                deleteRoom={deleteRoom}
              />
            </center>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;

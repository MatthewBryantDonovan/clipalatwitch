import axios from 'axios';

export default { 
      createUser: (userData) => axios.post('/api/users/create', userData),
      loginUser: (userData) => axios.post('/api/users/login', userData),
      findStreamer: (streamer) => axios.get('/api/search/streamer/'+streamer),
      findGame: (game) => axios.get('/api/search/game/'+game)

};
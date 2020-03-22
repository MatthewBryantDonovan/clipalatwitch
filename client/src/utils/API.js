import axios from 'axios';

export default { 
      createUser: (userData) => axios.post('/api/users/create', userData), //connected
      loginUser: (userData) => axios.post('/api/users/login', userData), //connected
      findStreamer: (streamer) => axios.get('/api/search/streamer/'+ streamer), //connected
      findGame: (game) => axios.get('/api/search/game/'+ game), //connected
      saveStreamer: (reqObj) => axios.post('/api/saved/streamer', reqObj), //connected
      saveGame: (reqObj) => axios.post('/api/saved/game', reqObj), //connected
      saveClip: (reqObj) => axios.post('/api/saved/clip', reqObj), // connected
      userSavedInfo: () => axios.get('/api/saved'), //connected
      viewClips: (type, id) => axios.get('/api/saved/clips/' + type + '/'+ id) ,// connected
      removeStreamerOrGame: (type, id) => axios.post('/api/saved/delete/' + type + '/'+ id), // connected
      logout: () => axios.delete('/api/users/logout'), // connected
      updateImage: () => axios.put('/api/users/updateimage') // connected
};
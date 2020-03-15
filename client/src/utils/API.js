import axios from 'axios';

export default { 
      createUser: (userData) => axios.post('/api/users/create', userData), //connected
      loginUser: (userData) => axios.post('/api/users/login', userData), //connected
      findStreamer: (streamer) => axios.get('/api/search/streamer/'+ streamer), //connected
      findGame: (game) => axios.get('/api/search/game/'+ game), //connected
      saveStreamer: (reqObj) => axios.post('/api/saved/streamer', reqObj), //connected FIXME: duplicates work ATM
      saveGame: (reqObj) => axios.post('/api/saved/game', reqObj), //connected FIXME: duplicates work ATM
      saveClip: (reqObj) => axios.post('/api/saved/clip', reqObj), // TODO: NOT CONNECTED FIXME: need to consider if passing game or streamer
      userSavedInfo: () => axios.get('/api/saved'), //connected
      viewClips: (type, id) => axios.get('/api/saved/clips/' + type + '/'+ id) // connected
};
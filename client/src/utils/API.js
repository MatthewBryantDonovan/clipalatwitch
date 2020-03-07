import axios from 'axios';

export default { 
      createUser: (userData) => axios.post('http://localhost:5000/api/users/create', {userData})
};
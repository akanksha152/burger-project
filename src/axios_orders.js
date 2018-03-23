import axios from 'axios';

const instances = axios.create({
  baseURL : 'https://my-burger-project-abeb6.firebaseio.com/'
})
export default instances;

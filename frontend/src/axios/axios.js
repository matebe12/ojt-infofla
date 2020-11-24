import axios from 'axios';
import { setInterceptors } from './interceptor';

function createInstanceWithAuth() {
  const instance = axios.create({
    baseURL: `http://localhost:3000/graphql`,
  });
  return setInterceptors(instance);
}

export const callAPI = createInstanceWithAuth();
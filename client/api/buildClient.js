import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // REquest is from server
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.kube-system.svc.cluster.local',
      headers: req.headers
    });
  } else {
    // Request is from browser
    return axios.create({
      baseURL: '/',
    });
  }
};

import api from '../api/axios'

export const fetchNearbyFarmers=()=>{
   return api.get('/user/fetch-vendor')
}
import axios from 'axios';
import {serverIP} from '../config/config';

class HomeHelper {
  // tslint:disable-next-line:typedef
  static async getStatistics(venueID) {
    const url = serverIP + '/venues/history';
    try {
      const res = await axios.post(url, {
        venue_id: venueID,
      });
      const data = res.data;
      console.log('Got statistics data: ', data);
      return data;
    } catch (e) {
      console.log('Error: ', e);
    }
  }
}

export default HomeHelper;

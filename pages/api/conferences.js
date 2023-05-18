import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  const jsonDirectory = path.join(process.cwd(), 'json');
  const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8');
  const json = JSON.parse(fileContents);

  const filters = Object.keys(req.query);

  const response = json.filter((conf) => {
    let resolve = true;
    return filters.map(filter => {

      if(filter in conf && (conf[filter] === null || conf[filter] === undefined)){
        return false;
      }
      
      if(Array.isArray(conf[filter])){
        if(! conf[filter].includes(req.query[filter])){
          resolve = false;
        }
      } else {
        if(conf[filter].toString() !== req.query[filter].toString()){
          resolve = false;
        }
      }

      return resolve;
      
    }).every(e => e === true)

  });

  res.status(200).json(response);
}

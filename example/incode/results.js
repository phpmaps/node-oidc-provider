import dotenv from 'dotenv';
import { getOcr } from './api/get-ocr.js';
import { getScores } from './api/get-scores.js';
import { flatten } from './helpers/flatten.js';
import { Auth } from './helpers/auth.js';


export const fetchResults = async (interviewId, token) => {
    const header = Auth.createHeader(token);
    const scores = await getScores(interviewId, header);
    
    const ocr = await getOcr(interviewId, header)
    
    //TODO: Doogs -Format results per study requirements
    //TODO: Action item on retention and results
    // Might need ...ocr.body

    //fetch images 
    //save images to S3


    const data = { ...scores, ...ocr };
    const flattenData = flatten(data);
    console.log(":::Incode Results")
    console.log(flattenData);

    //run delete api

    return flattenData;

}

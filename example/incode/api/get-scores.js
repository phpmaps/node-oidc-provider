import dotenv from 'dotenv';
import { doGet } from '../helpers/http-get.js';

dotenv.config();

export const getScores = async (client, interviewId, header) => {
    const endpoint = `omni/get/score?id=${interviewId}`;
    const url = `${client.API_URL}/${endpoint}`;

    try {
        const scores = await doGet(url, header);
        let data = {};
        if(scores.body?.idValidation?.photoSecurityAndQuality){
            const quality = scores.body?.idValidation?.photoSecurityAndQuality;
    
            const screenIdLiveness = quality.find(({ key }) => key === "screenIdLiveness");
            data.screenIdLiveness_value = screenIdLiveness.value;
            data.screenIdLiveness_status = screenIdLiveness.status;

            const paperIdLiveness = quality.find(({ key }) => key === "paperIdLiveness");
            data.screenIdLiveness_value = paperIdLiveness.value;
            data.screenIdLiveness_status = paperIdLiveness.status;

        }


        //Adding ID for mapping Ping
        data.id = interviewId || 'NO_INTERVIEW_ID';


        if(scores.body?.idValidation?.idSpecific){
            const idSpecific = scores.body?.idValidation?.idSpecific;
            const barcode2DDetected = idSpecific.find(({ key }) => key === "barcode2DDetected");
            data.barcode2DDetected_status = barcode2DDetected.status;

            const barcodeContent = idSpecific.find(({ key }) => key === "2DBarcodeContent");
            data.barcodeContent_status = barcodeContent.status;

            const documentNumberCrosscheck = idSpecific.find(({ key }) => key === "documentNumberCrosscheck");
            data.documentNumberCrosscheck_status = documentNumberCrosscheck.status;

            const documentExpired = idSpecific.find(({ key }) => key === "documentExpired");
            data.documentExpired_status = documentExpired?.status ? documentExpired?.status: 'FAIL'
        }

        if(scores.body?.faceRecognition){
            data.faceRecognition_existingUser = scores.body?.faceRecognition?.existingUser;
            data.faceRecognition_existingInterviewId = scores.body?.faceRecognition?.existingInterviewId;
            data.faceRecognition_maskCheck = scores.body?.faceRecognition?.maskCheck;
            data.faceRecognition_lensesCheck = scores.body?.faceRecognition?.lensesCheck.status;
            data.faceRecognition_faceBrightness = scores.body?.faceRecognition?.faceBrightness.status;
            data.faceRecognition_overall_value = scores.body?.faceRecognition?.overall.value;
            data.faceRecognition_overall_status = scores.body?.faceRecognition?.overall.status;
        }


        if(scores.body?.liveness?.livenessScore){
            data.livenessScore_value = scores.body.liveness.livenessScore.value;
            data.livenessScore_status = scores.body.liveness.livenessScore.status;
        }
        if(scores.body?.liveness?.photoQuality){
            data.photoQuality_value = scores.body.liveness.photoQuality.value;
        }
        if(scores.body?.liveness?.overall){
            data.liveness_overall_value = scores.body.liveness.overall.value;
            data.liveness_overall_status = scores.body.liveness.overall.status;
        }
        if(scores.body?.overall){
            data.overall_value = scores.body.overall.value;
            data.overall_status = scores.body.overall.status;
            data.overall_reason = scores.body.reasonMsg;  
        }
        return data;
    
    } catch (error) {
        throw Error(`error using ${endpoint}`);
    }
};

import AppConstants from "../constants/AppConstants";
import Diagnosis from "../dataObjects/Diagnosis";
import HttpClient from "../utils/HttpClient";
import { IDiagnosisService } from "./interfaces/IDiagnosisService";

class DiagnosisService implements IDiagnosisService {
    private static _instance?: DiagnosisService;
    private readonly httpClient!: HttpClient;

    public get instance() {
        if (!DiagnosisService._instance) {
            DiagnosisService._instance = new DiagnosisService();
        }

        return DiagnosisService._instance;
    }

    constructor() {
        this.httpClient = new HttpClient(AppConstants.apiBaseUrl, "/diagnosis");
    }

    async getAllDiagnosis(): Promise<Diagnosis[] | undefined>{
        const response = await this.httpClient.get(``);
        if (!response || !response?.data) {
            return;
        }

        if (response.error) {
            console.error(response.error.message);
            throw response.error;
        }

        return response.data;
        
    }

	async getRecordsByDiagnosisId(id: number): Promise<Diagnosis | undefined> {
        const response = await this.httpClient.get(`/${id}/records`);
        if (!response || !response?.data) {
            return;
        }
        
        if (response.error) {
            console.error(response.error.message);
            throw response.error;
        }

        return response.data;
	}
}

export default DiagnosisService;

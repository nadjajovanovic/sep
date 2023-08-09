import { Facility } from "./facility";
import { Patient } from "./patient";

export class Appoitment {
    appoitmentid: number;
    appoitmentdate: string = '';
    facility: Facility;
    patient: Patient;
}
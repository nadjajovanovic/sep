import { Doctor } from "./doctor";
import { ExamType } from "./exam-type";
import { Facility } from "./facility";
import { Insurance } from "./insurance";
import { Patient } from "./patient";

export class Exam {
    examid: number;
    examdate: string = '';
    roomnumber: string = '';
    doctor: Doctor;
    examtype: ExamType;
    insurance: Insurance;
    patient: Patient;
    facility: Facility;
}
package projekat.models;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


/**
 * The persistent class for the patient database table.
 * 
 */
@NoArgsConstructor
@Getter
@Entity
@NamedQuery(name="Patient.findAll", query="SELECT p FROM Patient p")
public class Patient implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="PATIENT_PATIENTID_GENERATOR", sequenceName="PATIENT_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="PATIENT_PATIENTID_GENERATOR")
	private Integer patientid;

	private String patientaddress;

	private String patientname;

	private String patientphonenumber;

	//bi-directional many-to-one association to Appoitment
	@JsonIgnore
	@OneToMany(mappedBy="patient")
	private List<Appoitment> appoitments;

	//bi-directional many-to-one association to Exam
	@JsonIgnore
	@OneToMany(mappedBy="patient")
	private List<Exam> exams;

	/*public Patient() {
		
	}

	public Integer getPatientid() {
		return patientid;
	}

	public void setPatientid(Integer patientid) {
		this.patientid = patientid;
	}

	public String getPatientaddress() {
		return patientaddress;
	}

	public void setPatientaddress(String patientaddress) {
		this.patientaddress = patientaddress;
	}

	public String getPatientname() {
		return patientname;
	}

	public void setPatientname(String patientname) {
		this.patientname = patientname;
	}

	public String getPatientphonenumber() {
		return patientphonenumber;
	}

	public void setPatientphonenumber(String patientphonenumber) {
		this.patientphonenumber = patientphonenumber;
	}

	public List<Appoitment> getAppoitments() {
		return appoitments;
	}

	public void setAppoitments(List<Appoitment> appoitments) {
		this.appoitments = appoitments;
	}

	public List<Exam> getExams() {
		return exams;
	}

	public void setExams(List<Exam> exams) {
		this.exams = exams;
	}
	*/
	
}
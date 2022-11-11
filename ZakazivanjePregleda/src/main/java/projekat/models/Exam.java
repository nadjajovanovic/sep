package projekat.models;

import java.io.Serializable;
import javax.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


/**
 * The persistent class for the exam database table.
 * 
 */
@NoArgsConstructor
@Getter
@Setter
@Entity
@NamedQuery(name="Exam.findAll", query="SELECT e FROM Exam e")
public class Exam implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="EXAM_EXAMID_GENERATOR", sequenceName="EXAM_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="EXAM_EXAMID_GENERATOR")
	private Integer examid;

	@Temporal(TemporalType.DATE)
	private Date examdate;

	private String roomnumber;

	//bi-directional many-to-one association to Doctor
	@ManyToOne
	@JoinColumn(name="doctorid")
	private Doctor doctor;

	//bi-directional many-to-one association to Examtype
	@ManyToOne
	@JoinColumn(name="examtypeid")
	private Examtype examtype;

	//bi-directional many-to-one association to Insurance
	@ManyToOne
	@JoinColumn(name="insuranceid")
	private Insurance insurance;

	//bi-directional many-to-one association to Patient
	@ManyToOne
	@JoinColumn(name="patientid")
	private Patient patient;

	/*public Exam() {
		
	}

	public Integer getExamid() {
		return examid;
	}

	public void setExamid(Integer examid) {
		this.examid = examid;
	}

	public Date getExamdate() {
		return examdate;
	}

	public void setExamdate(Date examdate) {
		this.examdate = examdate;
	}

	public String getRoomnumber() {
		return roomnumber;
	}

	public void setRoomnumber(String roomnumber) {
		this.roomnumber = roomnumber;
	}

	public Doctor getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}

	public Examtype getExamtype() {
		return examtype;
	}

	public void setExamtype(Examtype examtype) {
		this.examtype = examtype;
	}

	public Insurance getInsurance() {
		return insurance;
	}

	public void setInsurance(Insurance insurance) {
		this.insurance = insurance;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}
	*/
	

}
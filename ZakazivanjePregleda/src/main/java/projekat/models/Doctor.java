package projekat.models;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


/**
 * The persistent class for the doctor database table.
 * 
 */
@Getter
@Setter
@Entity
@NamedQuery(name="Doctor.findAll", query="SELECT d FROM Doctor d")
public class Doctor implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="DOCTOR_DOCTORID_GENERATOR", sequenceName="DOCTOR_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="DOCTOR_DOCTORID_GENERATOR")
	private Integer doctorid;

	private String doctoraddress;

	private String doctorname;

	private String doctorphonenumber;

	private String occupation;

	//bi-directional many-to-one association to Exam
	@JsonIgnore
	@OneToMany(mappedBy="doctor")
	private List<Exam> exams;

	public Doctor() {
	}

	/*public Integer getDoctorid() {
		return doctorid;
	}

	public void setDoctorid(Integer doctorid) {
		this.doctorid = doctorid;
	}

	public String getDoctoraddress() {
		return doctoraddress;
	}

	public void setDoctoraddress(String doctoraddress) {
		this.doctoraddress = doctoraddress;
	}

	public String getDoctorname() {
		return doctorname;
	}

	public void setDoctorname(String doctorname) {
		this.doctorname = doctorname;
	}

	public String getDoctorphonenumber() {
		return doctorphonenumber;
	}

	public void setDoctorphonenumber(String doctorphonenumber) {
		this.doctorphonenumber = doctorphonenumber;
	}

	public String getOccupation() {
		return occupation;
	}

	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}

	public List<Exam> getExams() {
		return exams;
	}

	public void setExams(List<Exam> exams) {
		this.exams = exams;
	}*/
	
	
}
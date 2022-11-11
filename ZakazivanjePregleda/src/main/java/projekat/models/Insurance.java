package projekat.models;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


/**
 * The persistent class for the insurance database table.
 * 
 */
@NoArgsConstructor
@Getter
@Setter
@Entity
@NamedQuery(name="Insurance.findAll", query="SELECT i FROM Insurance i")
public class Insurance implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="INSURANCE_INSURANCEID_GENERATOR", sequenceName="INSURANCE_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="INSURANCE_INSURANCEID_GENERATOR")
	private Integer insuranceid;

	private String insurancename;

	//bi-directional many-to-one association to Exam
	@JsonIgnore
	@OneToMany(mappedBy="insurance")
	private List<Exam> exams;

	/*public Insurance() {
		
	}

	public Integer getInsuranceid() {
		return insuranceid;
	}

	public void setInsuranceid(Integer insuranceid) {
		this.insuranceid = insuranceid;
	}

	public String getInsurancename() {
		return insurancename;
	}

	public void setInsurancename(String insurancename) {
		this.insurancename = insurancename;
	}

	public List<Exam> getExams() {
		return exams;
	}

	public void setExams(List<Exam> exams) {
		this.exams = exams;
	}*/
}
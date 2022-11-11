package projekat.models;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


/**
 * The persistent class for the examtype database table.
 * 
 */
@NoArgsConstructor
@Getter
@Setter
@Entity
@NamedQuery(name="Examtype.findAll", query="SELECT e FROM Examtype e")
public class Examtype implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="EXAMTYPE_EXAMTYPEID_GENERATOR", sequenceName="EXAM_TYPE_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="EXAMTYPE_EXAMTYPEID_GENERATOR")
	private Integer examtypeid;

	private String examtypename;

	//bi-directional many-to-one association to Exam
	@JsonIgnore
	@OneToMany(mappedBy="examtype")
	private List<Exam> exams;

	/*public Examtype() {
		
	}

	public Integer getExamtypeid() {
		return examtypeid;
	}

	public void setExamtypeid(Integer examtypeid) {
		this.examtypeid = examtypeid;
	}

	public String getExamtypename() {
		return examtypename;
	}

	public void setExamtypename(String examtypename) {
		this.examtypename = examtypename;
	}

	public List<Exam> getExams() {
		return exams;
	}

	public void setExams(List<Exam> exams) {
		this.exams = exams;
	}*/
	
	
}
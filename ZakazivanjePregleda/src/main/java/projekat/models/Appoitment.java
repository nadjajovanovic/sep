package projekat.models;

import java.io.Serializable;
import javax.persistence.*;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


/**
 * The persistent class for the appoitment database table.
 * 
 */
@NoArgsConstructor
@Getter
@Setter
@Entity
@NamedQuery(name="Appoitment.findAll", query="SELECT a FROM Appoitment a")
public class Appoitment implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="APPOITMENT_APPOITMENTID_GENERATOR", sequenceName="APPOITMENT_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="APPOITMENT_APPOITMENTID_GENERATOR")
	private Integer appoitmentid;

	@Temporal(TemporalType.DATE)
	private Date appoitmentdate;

	//bi-directional many-to-one association to Facility
	@ManyToOne
	@JoinColumn(name="facilityid")
	private Facility facility;

	/*@Column(name="facilityid")
	private Integer facility;*/

	//bi-directional many-to-one association to Patient
	@ManyToOne
	@JoinColumn(name="patientid")
	private Patient patient;

	/*@Column(name="patientid")
	private Integer patient;*/

	/*public Integer getAppoitmentid() {
		return appoitmentid;
	}

	public void setAppoitmentid(Integer appoitmentid) {
		this.appoitmentid = appoitmentid;
	}

	public Date getAppoitmentdate() {
		return appoitmentdate;
	}

	public void setAppoitmentdate(Date appoitmentdate) {
		this.appoitmentdate = appoitmentdate;
	}

	public Facility getFacility() {
		return facility;
	}

	public void setFacility(Facility facility) {
		this.facility = facility;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}
	*/
	
}
package projekat.models;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


/**
 * The persistent class for the facility database table.
 * 
 */
@NoArgsConstructor
@Getter
@Entity
@NamedQuery(name="Facility.findAll", query="SELECT f FROM Facility f")
public class Facility implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="FACILITY_FACILITYID_GENERATOR", sequenceName="FACILITY_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="FACILITY_FACILITYID_GENERATOR")
	private Integer facilityid;

	private String facilityaddress;

	private String facilitycontact;

	private String facilityname;

	//bi-directional many-to-one association to Appoitment
	@JsonIgnore
	@OneToMany(mappedBy="facility")
	private List<Appoitment> appoitments;

	//bi-directional many-to-one association to City
	@ManyToOne
	@JoinColumn(name="cityid")
	private City city;

	/*@Column(name="cityid")
	private Integer city;*/

	/*public Facility() {
		
	}

	public Integer getFacilityid() {
		return facilityid;
	}

	public void setFacilityid(Integer facilityid) {
		this.facilityid = facilityid;
	}

	public String getFacilityaddress() {
		return facilityaddress;
	}

	public void setFacilityaddress(String facilityaddress) {
		this.facilityaddress = facilityaddress;
	}

	public String getFacilitycontact() {
		return facilitycontact;
	}

	public void setFacilitycontact(String facilitycontact) {
		this.facilitycontact = facilitycontact;
	}

	public String getFacilityname() {
		return facilityname;
	}

	public void setFacilityname(String facilityname) {
		this.facilityname = facilityname;
	}

	public List<Appoitment> getAppoitments() {
		return appoitments;
	}

	public void setAppoitments(List<Appoitment> appoitments) {
		this.appoitments = appoitments;
	}

	public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}
	*/
	
}
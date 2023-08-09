package projekat.models;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


/**
 * The persistent class for the municipality database table.
 * 
 */
@NoArgsConstructor
@Getter
@Entity
@NamedQuery(name="Municipality.findAll", query="SELECT m FROM Municipality m")
public class Municipality implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="MUNICIPALITY_MUNICIPALITYID_GENERATOR", sequenceName="MUNICIPALITY_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="MUNICIPALITY_MUNICIPALITYID_GENERATOR")
	private Integer municipalityid;

	private String municipalityname;

	//bi-directional many-to-one association to City
	@JsonIgnore
	@OneToMany(mappedBy="municipality")
	private List<City> cities;

	//bi-directional many-to-one association to State
	@ManyToOne
	@JoinColumn(name="stateid")
	private State state;

	/*@Column(name="stateid")
	private Integer state;*/

	/*public Municipality() {
		
	}

	public Integer getMunicipalityid() {
		return municipalityid;
	}

	public void setMunicipalityid(Integer municipalityid) {
		this.municipalityid = municipalityid;
	}

	public String getMunicipalityname() {
		return municipalityname;
	}

	public void setMunicipalityname(String municipalityname) {
		this.municipalityname = municipalityname;
	}

	public List<City> getCities() {
		return cities;
	}

	public void setCities(List<City> cities) {
		this.cities = cities;
	}

	public State getState() {
		return state;
	}

	public void setState(State state) {
		this.state = state;
	}
	*/
	
}
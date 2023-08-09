package projekat.models;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


/**
 * The persistent class for the city database table.
 * 
 */
@NoArgsConstructor
@Getter
@Setter
@Entity
@NamedQuery(name="City.findAll", query="SELECT c FROM City c")
public class City implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="CITY_CITYID_GENERATOR", sequenceName="CITY_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="CITY_CITYID_GENERATOR")
	private Integer cityid;

	private String cityname;

	//bi-directional many-to-one association to Municipality
	@ManyToOne
	@JoinColumn(name="municipalityid")
	private Municipality municipality;

	/*@Column(name="municipalityid")
	private Integer municipality;*/

	//bi-directional many-to-one association to Facility
	@JsonIgnore
	@OneToMany(mappedBy="city")
	private List<Facility> facilities;

	/*public City() {
		
	}

	public Integer getCityid() {
		return cityid;
	}

	public void setCityid(Integer cityid) {
		this.cityid = cityid;
	}

	public String getCityname() {
		return cityname;
	}

	public void setCityname(String cityname) {
		this.cityname = cityname;
	}

	public Municipality getMunicipality() {
		return municipality;
	}

	public void setMunicipality(Municipality municipality) {
		this.municipality = municipality;
	}

	public List<Facility> getFacilities() {
		return facilities;
	}

	public void setFacilities(List<Facility> facilities) {
		this.facilities = facilities;
	}*/
	
	
}
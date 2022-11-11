package projekat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projekat.models.Facility;

public interface FacilityRepository extends JpaRepository<Facility, Integer> {
}

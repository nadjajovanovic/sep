package projekat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projekat.models.Municipality;

public interface MunicipalityRepository extends JpaRepository<Municipality, Integer> {
}

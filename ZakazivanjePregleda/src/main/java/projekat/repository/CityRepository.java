package projekat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projekat.models.City;

public interface CityRepository extends JpaRepository<City, Integer> {
}

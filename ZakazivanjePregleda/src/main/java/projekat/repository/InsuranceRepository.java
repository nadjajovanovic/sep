package projekat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projekat.models.Insurance;

public interface InsuranceRepository extends JpaRepository<Insurance, Integer> {
}

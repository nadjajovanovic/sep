package projekat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projekat.models.Appoitment;

public interface AppoitmentRepository extends JpaRepository<Appoitment, Integer> {
}

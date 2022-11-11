package projekat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projekat.models.Patient;

public interface PatientRepository extends JpaRepository<Patient, Integer> {
}

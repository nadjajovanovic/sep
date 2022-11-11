package projekat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import projekat.models.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {

}

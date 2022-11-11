package projekat.service;

import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import projekat.models.Doctor;
import projekat.repository.DoctorRepository;

@Service
@AllArgsConstructor
public class DoctorService {
	
	@Autowired
    private DoctorRepository doctorRepository;

    public Collection<Doctor> getAll(){
        final var doctors = doctorRepository.findAll();
        return doctors;
    }

    public Optional<Doctor> getOne(Integer id) {
        final var doctor = doctorRepository.findById(id);
        return doctor;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Doctor insert(Doctor doctor) {
        final var inserted = doctorRepository.save(doctor);
        return inserted;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Doctor update(Doctor doctor) {
        Doctor updated = null;
        if (doctorRepository.existsById(doctor.getDoctorid())) {
            updated = doctorRepository.save(doctor);
        }
        return updated;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public boolean delete(Integer id) {
        if(doctorRepository.existsById(id))
            doctorRepository.deleteById(id);
        return true;
    }

}

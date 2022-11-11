package projekat.service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import projekat.models.Patient;
import projekat.repository.PatientRepository;

import java.util.Collection;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public Collection<Patient> getAll(){
        final var patients = patientRepository.findAll();
        return patients;
    }

    public Optional<Patient> getOne(Integer id) {
        final var patient = patientRepository.findById(id);
        return patient;
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public Patient insert(Patient patient) {
        final var inserted = patientRepository.save(patient);
        return inserted;
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public Patient update(Patient patient) {
        Patient updated = null;
        if (patientRepository.existsById(patient.getPatientid())) {
            updated = patientRepository.save(patient);
        }
        return updated;
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public boolean delete(Integer id) {
        if(patientRepository.existsById(id))
            patientRepository.deleteById(id);
        return true;
    }
}

package projekat.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projekat.models.Doctor;
import projekat.models.Patient;
import projekat.service.PatientService;

import java.util.Collection;
import java.util.Comparator;
import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping("patients")
    public Collection<Patient> getAllPatients() {
        final var patients = patientService.getAll();
        final var listOfPatients = patients
                .stream()
                .sorted(Comparator.comparingInt(Patient::getPatientid))
                .toList();
        return listOfPatients;
    }

    @GetMapping("patients/{id}")
    public Optional<Patient> getPatient(@PathVariable Integer id) {
        final var onePatient = patientService.getOne(id);
        return onePatient;
    }

    @PostMapping("patients")
    public ResponseEntity<Patient> insertPatient(@RequestBody Patient patient) {
        patientService.insert(patient);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("patients")
    public ResponseEntity<Patient> updatePatient(@RequestBody Patient patient) {
        patientService.update(patient);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("patients/{id}")
    public ResponseEntity<Patient> deletePatient(@PathVariable Integer id) {
        patientService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

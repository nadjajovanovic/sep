package projekat.controller;

import java.util.Collection;
import java.util.Comparator;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import projekat.models.Doctor;
import projekat.service.DoctorService;

@RestController
@AllArgsConstructor
@CrossOrigin
public class DoctorController {
	
	@Autowired
    private DoctorService doctorService;

    @GetMapping("doctors")
    public Collection<Doctor> getAllDoctors() {
        final var doctors = doctorService.getAll();
        final var listOfDoctors = doctors
                .stream()
                .sorted(Comparator.comparingInt(Doctor::getDoctorid))
                .toList();
        return listOfDoctors;
    }

    @GetMapping("doctors/{id}")
    public Optional<Doctor> getDoctor(@PathVariable Integer id) {
        final var oneDoctor = doctorService.getOne(id);
        return oneDoctor;
    }

    @PostMapping("doctors")
    public ResponseEntity<Doctor> insertDoctor(@RequestBody Doctor doctor) {
        doctorService.insert(doctor);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("doctors")
    public ResponseEntity<Doctor> updateDoctor(@RequestBody Doctor doctor) {
        doctorService.update(doctor);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("doctors/{id}")
    public ResponseEntity<Doctor> deleteDoctor(@PathVariable Integer id) {
        doctorService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

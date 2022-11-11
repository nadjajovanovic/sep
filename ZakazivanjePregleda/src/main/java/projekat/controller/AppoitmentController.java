package projekat.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projekat.models.Appoitment;
import projekat.models.Doctor;
import projekat.service.AppoitmentService;

import java.util.Collection;
import java.util.Comparator;
import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin
public class AppoitmentController {

    @Autowired
    private AppoitmentService appoitmentService;

    @GetMapping("appoitments")
    public Collection<Appoitment> getAllAppoitments() {
        final var appoitments = appoitmentService.getAll();
        final var listOfAppoitments = appoitments
                .stream()
                .sorted(Comparator.comparingInt(Appoitment::getAppoitmentid))
                .toList();
        return listOfAppoitments;
    }

    @GetMapping("appoitments/{appoitmentid}")
    public Optional<Appoitment> getAppoitment(@PathVariable Integer appoitmentid) {
        final var oneAppoitment = appoitmentService.getOne(appoitmentid);
        return oneAppoitment;
    }

    @PostMapping("appoitments")
    public ResponseEntity<Appoitment> insertAppoitment(@RequestBody Appoitment appoitment) {
        appoitmentService.insert(appoitment);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("appoitments")
    public ResponseEntity<Appoitment> updateAppoitment(@RequestBody Appoitment appoitment) {
        appoitmentService.update(appoitment);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("appoitments/{appoitmentid}")
    public ResponseEntity<Doctor> deleteDoctor(@PathVariable Integer appoitmentid) {
        appoitmentService.delete(appoitmentid);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

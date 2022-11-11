package projekat.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projekat.models.Doctor;
import projekat.models.Insurance;
import projekat.service.InsuranceService;

import java.util.Collection;
import java.util.Comparator;
import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin
public class InsuranceController {

    @Autowired
    private InsuranceService insuranceService;

    @GetMapping("insurances")
    public Collection<Insurance> getAllInsurances() {
        final var insurances = insuranceService.getAll();
        final var listOfInsurances = insurances
                .stream()
                .sorted(Comparator.comparingInt(Insurance::getInsuranceid))
                .toList();
        return listOfInsurances;
    }

    @GetMapping("insurances/{id}")
    public Optional<Insurance> getInsurance(@PathVariable Integer id) {
        final var oneInsurance = insuranceService.getOne(id);
        return oneInsurance;
    }

    @PostMapping("insurances")
    public ResponseEntity<Insurance> insertInsurance(@RequestBody Insurance insurance) {
        insuranceService.insert(insurance);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("insurances")
    public ResponseEntity<Insurance> updateInsurance(@RequestBody Insurance insurance) {
        insuranceService.update(insurance);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("insurances/{id}")
    public ResponseEntity<Insurance> deleteInsurance(@PathVariable Integer id) {
        insuranceService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

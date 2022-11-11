package projekat.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projekat.models.Doctor;
import projekat.models.Facility;
import projekat.service.FacilityService;

import java.util.Collection;
import java.util.Comparator;
import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin
public class FacilityController {

    @Autowired
    private FacilityService facilityService;

    @GetMapping("facilities")
    public Collection<Facility> getAllFacilities() {
        final var facilities = facilityService.getAll();
        final var listOfFacilities = facilities
                .stream()
                .sorted(Comparator.comparingInt(Facility::getFacilityid))
                .toList();
        return listOfFacilities;
    }

    @GetMapping("facilities/{id}")
    public Optional<Facility> getFacility(@PathVariable Integer id) {
        final var oneFacility = facilityService.getOne(id);
        return oneFacility;
    }

    @PostMapping("facilities")
    public ResponseEntity<Facility> insertFacility(@RequestBody Facility facility) {
        facilityService.insert(facility);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("facilities")
    public ResponseEntity<Facility> updateFacility(@RequestBody Facility facility) {
        facilityService.update(facility);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("facilities/{id}")
    public ResponseEntity<Facility> deleteFacility(@PathVariable Integer id) {
        facilityService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

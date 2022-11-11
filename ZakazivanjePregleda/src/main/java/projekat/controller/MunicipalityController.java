package projekat.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projekat.models.Doctor;
import projekat.models.Municipality;
import projekat.service.MunicipalityService;

import java.util.Collection;
import java.util.Comparator;
import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin
public class MunicipalityController {

    @Autowired
    private MunicipalityService municipalityService;

    @GetMapping("municipalities")
    public Collection<Municipality> getAllMunicipalities() {
        final var municipalitites = municipalityService.getAll();
        final var listOfMunicipalities = municipalitites
                .stream()
                .sorted(Comparator.comparingInt(Municipality::getMunicipalityid))
                .toList();
        return listOfMunicipalities;
    }

    @GetMapping("municipalities/{id}")
    public Optional<Municipality> getMunicipality(@PathVariable Integer id) {
        final var oneMunicipality = municipalityService.getOne(id);
        return oneMunicipality;
    }

    @PostMapping("municipalities")
    public ResponseEntity<Municipality> insertMunicipality(@RequestBody Municipality municipality) {
        municipalityService.insert(municipality);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("municipalities")
    public ResponseEntity<Municipality> updateMunicipality(@RequestBody Municipality municipality) {
        municipalityService.update(municipality);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("municipalities/{id}")
    public ResponseEntity<Municipality> deleteMunicipality(@PathVariable Integer id) {
        municipalityService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

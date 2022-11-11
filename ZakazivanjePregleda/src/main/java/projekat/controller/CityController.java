package projekat.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projekat.models.City;
import projekat.models.Doctor;
import projekat.service.CityService;

import java.util.Collection;
import java.util.Comparator;
import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin
public class CityController {

    @Autowired
    private CityService cityService;

    @GetMapping("cities")
    public Collection<City> getAllCities() {
        final var cities = cityService.getAll();
        final var listOfCities = cities
                .stream()
                .sorted(Comparator.comparingInt(City::getCityid))
                .toList();
        return listOfCities;
    }

    @GetMapping("cities/{id}")
    public Optional<City> getCity(@PathVariable Integer id) {
        final var oneCity = cityService.getOne(id);
        return oneCity;
    }

    @PostMapping("cities")
    public ResponseEntity<City> insertCity(@RequestBody City city) {
        cityService.insert(city);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("cities")
    public ResponseEntity<City> updateCity(@RequestBody City city) {
        cityService.update(city);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("cities/{id}")
    public ResponseEntity<City> deleteCity(@PathVariable Integer id) {
        cityService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

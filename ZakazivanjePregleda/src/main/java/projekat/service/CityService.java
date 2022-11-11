package projekat.service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import projekat.models.City;
import projekat.repository.CityRepository;

import java.util.Collection;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CityService {

    @Autowired
    private CityRepository cityRepository;

    public Collection<City> getAll(){
        final var cities = cityRepository.findAll();
        return cities;
    }

    public Optional<City> getOne(Integer id) {
        final var city = cityRepository.findById(id);
        return city;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public City insert(City city) {
        final var inserted = cityRepository.save(city);
        return inserted;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public City update(City city) {
        City updated = null;
        if (cityRepository.existsById(city.getCityid())) {
            updated = cityRepository.save(city);
        }
        return updated;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public boolean delete(Integer id) {
        if(cityRepository.existsById(id))
            cityRepository.deleteById(id);
        return true;
    }
}

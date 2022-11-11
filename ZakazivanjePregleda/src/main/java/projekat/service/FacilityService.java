package projekat.service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import projekat.models.Facility;
import projekat.repository.FacilityRepository;

import java.util.Collection;
import java.util.Optional;

@Service
@AllArgsConstructor
public class FacilityService {

    @Autowired
    private FacilityRepository facilityRepository;

    public Collection<Facility> getAll(){
        final var facilities = facilityRepository.findAll();
        return facilities;
    }

    public Optional<Facility> getOne(Integer id) {
        final var facility = facilityRepository.findById(id);
        return facility;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Facility insert(Facility facility) {
        final var inserted = facilityRepository.save(facility);
        return inserted;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Facility update(Facility facility) {
        Facility updated = null;
        if (facilityRepository.existsById(facility.getFacilityid())) {
            updated = facilityRepository.save(facility);
        }
        return updated;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public boolean delete(Integer id) {
        if(facilityRepository.existsById(id))
            facilityRepository.deleteById(id);
        return true;
    }
}

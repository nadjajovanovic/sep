package projekat.service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import projekat.models.Municipality;
import projekat.repository.MunicipalityRepository;

import java.util.Collection;
import java.util.Optional;

@Service
@AllArgsConstructor
public class MunicipalityService {

    @Autowired
    private MunicipalityRepository municipalityRepository;

    public Collection<Municipality> getAll(){
        final var municipalities = municipalityRepository.findAll();
        return municipalities;
    }

    public Optional<Municipality> getOne(Integer id) {
        final var municipality = municipalityRepository.findById(id);
        return municipality;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Municipality insert(Municipality municipality) {
        final var inserted = municipalityRepository.save(municipality);
        return inserted;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Municipality update(Municipality municipality) {
        Municipality updated = null;
        if (municipalityRepository.existsById(municipality.getMunicipalityid())) {
            updated = municipalityRepository.save(municipality);
        }
        return updated;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public boolean delete(Integer id) {
        if(municipalityRepository.existsById(id))
            municipalityRepository.deleteById(id);
        return true;
    }
}

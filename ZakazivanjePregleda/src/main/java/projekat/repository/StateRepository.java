package projekat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projekat.models.State;

public interface StateRepository extends JpaRepository<State, Integer> {
}

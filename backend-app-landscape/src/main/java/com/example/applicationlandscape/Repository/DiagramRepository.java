package com.example.applicationlandscape.Repository;

import com.example.applicationlandscape.Entity.Diagram;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface DiagramRepository extends CrudRepository<Diagram, Long> {
    Optional<Object> findByName(String name);
}

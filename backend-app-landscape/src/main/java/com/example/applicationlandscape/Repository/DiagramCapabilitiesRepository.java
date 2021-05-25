package com.example.applicationlandscape.Repository;

import com.example.applicationlandscape.Entity.BusinessCapabilities;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiagramCapabilitiesRepository extends CrudRepository<BusinessCapabilities, Long> {
}

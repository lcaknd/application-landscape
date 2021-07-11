package com.example.applicationlandscape.Repository;

import com.example.applicationlandscape.Entity.DiagramVisual;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiagramVisualRepository extends JpaRepository<DiagramVisual, Integer> {
}
package com.example.applicationlandscape.Repository;


import com.example.applicationlandscape.Entity.Link;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LinkRepository extends JpaRepository<Link, Integer> {
}

package com.stevy.contratti.config;

import com.stevy.contratti.models.Role;
import com.stevy.contratti.models.ERole;
import com.stevy.contratti.models.User;
import com.stevy.contratti.repository.RoleRepository;
import com.stevy.contratti.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.HashSet;
import java.util.Set;

@Component
public class InitialDataLoader implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private PasswordEncoder encoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Créer le rôle si nécessaire
        Role role = roleRepository.findByName(ERole.ROLE_HR)
                .orElseGet(() -> {
                    Role newRole = new Role();
                    newRole.setName(ERole.ROLE_HR);
                    return roleRepository.save(newRole);
                });

        // Créer l'utilisateur stevy
        if (userRepository.findByUsername("stevy").isEmpty()) {
            User user = new User();
            user.setUsername("stevy");
            user.setEmail("stevy@example.com");
            user.setPassword(encoder.encode("stevy237"));
            
            Set<Role> roles = new HashSet<>();
            roles.add(role);
            
            user.setRoles(roles);
            
            userRepository.save(user);
            System.out.println("Utilisateur 'stevy' créé avec succès!");
        } else {
            System.out.println("L'utilisateur 'stevy' existe déjà");
        }
    }
}

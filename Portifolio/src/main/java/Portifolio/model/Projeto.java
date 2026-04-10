package Portifolio.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Projeto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String descricao;
    private String tecnologia;
    private String linkGithub;
}
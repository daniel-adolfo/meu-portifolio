package Portifolio.controller;

import Portifolio.model.Projeto;
import Portifolio.repository.ProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projetos")
@CrossOrigin(origins = "*")
public class ProjetoController {

    @Autowired
    private ProjetoRepository repository;

    @GetMapping
    public List<Projeto> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Projeto salvar(@RequestBody Projeto projeto) {
        return repository.save(projeto);
    }

    // --- DELETAR (DELETE) ---
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        repository.deleteById(id);
    }

    // --- EDITAR (UPDATE) ---
    @PutMapping("/{id}")
    public Projeto atualizar(@PathVariable Long id, @RequestBody Projeto projetoAtualizado) {
        return repository.findById(id).map(projeto -> {
            projeto.setTitulo(projetoAtualizado.getTitulo());
            projeto.setDescricao(projetoAtualizado.getDescricao());
            projeto.setTecnologia(projetoAtualizado.getTecnologia());
            projeto.setLinkGithub(projetoAtualizado.getLinkGithub());
            return repository.save(projeto);
        }).orElseThrow(() -> new RuntimeException("Projeto não encontrado"));
    }
}
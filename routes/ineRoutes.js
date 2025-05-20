const express = require('express');
const router = express.Router();
const db = require('../db');

// POST - Insertar en las 3 tablas
router.post('/guardar', (req, res) => {
  const { persona, domicilio, ine } = req.body;

  const sqlPersona = `INSERT INTO persona (nombre, apellido_paterno, apellido_materno, sexo, curp) VALUES (?, ?, ?, ?, ?)`;
  db.query(sqlPersona, Object.values(persona), (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const sqlDomicilio = `INSERT INTO domicilio (calle, colonia, municipio, estado, cp) VALUES (?, ?, ?, ?, ?)`;
    db.query(sqlDomicilio, Object.values(domicilio), (err) => {
      if (err) return res.status(500).json({ error: err.message });

      const sqlIne = `INSERT INTO ine (clave_elector, anio_registro, seccion) VALUES (?, ?, ?)`;
      db.query(sqlIne, Object.values(ine), (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: "Datos guardados en las 3 tablas." });
      });
    });
  });
});

// GET
router.get('/personas', (req, res) => {
  db.query('SELECT * FROM persona', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.get('/domicilios', (req, res) => {
  db.query('SELECT * FROM domicilio', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.get('/ines', (req, res) => {
  db.query('SELECT * FROM ine', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// PUT
router.put('/persona/:id', (req, res) => {
  const { nombre, apellido_paterno, apellido_materno, sexo, curp } = req.body;
  const { id } = req.params;

  const sql = `UPDATE persona SET nombre = ?, apellido_paterno = ?, apellido_materno = ?, sexo = ?, curp = ? WHERE id = ?`;
  db.query(sql, [nombre, apellido_paterno, apellido_materno, sexo, curp, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Persona actualizada' });
  });
});

// PATCH
router.patch('/persona/:id', (req, res) => {
  const { id } = req.params;
  const campos = req.body;

  const sqlCampos = Object.keys(campos).map(key => `${key} = ?`).join(', ');
  const valores = Object.values(campos);

  db.query(`UPDATE persona SET ${sqlCampos} WHERE id = ?`, [...valores, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Persona actualizada parcialmente' });
  });
});

// DELETE
router.delete('/persona/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM persona WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Persona eliminada' });
  });
});
// GET persona por ID
router.get('/persona/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM persona WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ mensaje: 'Persona no encontrada' });
    res.json(results[0]);
  });
});

module.exports = router;

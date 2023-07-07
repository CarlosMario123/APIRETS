const express = require("express");
const routesProducto = express.Router();

routesProducto.get("/", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("SELECT * FROM Producto", (err, rows) => {
      if (err) return res.send(err);

      res.json(rows);
    });
  });
});

routesProducto.get("/:nombre", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      "SELECT Nombre_Producto,Producto_Precio,Cantidad_Disponible FROM Producto WHERE Nombre_Producto = ?",
      [req.params.nombre],
      (err, rows) => {
        if (err) return res.send(err);
        res.json(rows);
      }
    );
  });
});

routesProducto.post("/", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query("INSERT INTO Producto set ?", [req.body], (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});

routesProducto.delete("/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      "DELETE FROM Ṕroducto WHERE id_Producto = ?",
      [req.params.id],
      (err, rows) => {
        if (err) return res.send(err);

        res.json(rows);
      }
    );
  });
});

routesProducto.put("/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      "UPDATE Producto set ? WHERE id_Producto = ?",
      [req.body, req.params.id],
      (err, rows) => {
        if (err) return res.send(err);
      }
    );
  });
});

module.exports = routesProducto;

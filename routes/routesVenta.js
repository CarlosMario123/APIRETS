const express = require("express");
const routesVenta = express.Router();

routesVenta.get("/", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("SELECT * FROM Venta", (err, rows) => {
      if (err) return res.send(err);

      res.json(rows);
    });
  });
});

routesVenta.get("/:month/:year", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      `SELECT Producto.id_Producto, Producto.Nombre, SUM(Venta.Cantidad_Vendida) AS Total_Vendido
      FROM Venta
      JOIN Producto ON Venta.id_Producto = Producto.id_Producto
      WHERE YEAR(Venta.Fecha_entrega) = ${req.params.year} AND MONTH(Venta.Fecha_entrega) = ${req.params.month}
      GROUP BY Venta.id_Producto, Producto.Nombre
      ORDER BY Total_Vendido DESC
      LIMIT 1;`,
      (err, rows) => {
        if (err) return res.send(err);

        res.json(rows);
      }
    );
    2;
  });
});

routesVenta.get("/Productos/:year/:month", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      `SELECT id_Venta,id_Cliente,Venta.id_Producto,Cantidad_Vendida,Total_Vendido,Fecha_entrega, Producto.Nombre FROM Venta join Producto WHERE YEAR(Venta.Fecha_entrega)=${req.params.year} AND MONTH(Venta.Fecha_entrega)=${req.params.month} and Venta.id_Producto = Producto.id_Producto;`,
      (err, rows) => {
        if (err) return res.send(err);

        res.json(rows);
      }
    );
  });
});

routesVenta.post("/", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query("INSERT INTO Venta set ?", [req.body], (err, rows) => {
      if (err) return res.send(err);
    });
  });
});

routesVenta.delete("/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      "DELETE FROM Venta WHERE id_Venta = ?",
      [req.params.id],
      (err, rows) => {
        if (err) return res.send(err);

        res.json(rows);
      }
    );
  });
});

routesVenta.put("/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      "UPDATE Venta set ? WHERE id_Venta = ?",
      [req.body, req.params.id],
      (err, rows) => {
        if (err) return res.send(err);
      }
    );
  });
});

module.exports = routesVenta;

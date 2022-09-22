class Product {

    async createProduct(params){
        const codeSQL = `
        INSERT INTO product(brand_id, category_id, name, description, price)
        VALUES (${params.brand_id}, '${params.category_id}', '${params.name}', '${params.description}', '${params.price}')
        RETURNING * 
        `
        try {
          const res = await params.pool.query(codeSQL)
          console.log('Product created successfully\n')
          console.table(res.rows)
          return { err : null, data : res.rows }
        } catch (err) {
          console.log(err.stack)
          return { err : err }
        } 
    }

    async readProducts(_pool){
        try {
          const res = await _pool.query('SELECT * FROM product')
          console.table(res.rows)
          return { err : null, data : res.rows }
        } catch (err) {
          console.log(err.stack)
          return { err : err }
        } 
    }

    async updateProduct (params) {
        
        try {
          const res = await params.pool.query(`UPDATE product
          SET brand_id='${params.brand_id}', category_id='${params.category_id}', name='${params.name}', description='${params.description}', price='${params.price}',updated_at = now()
          WHERE id = ${params.where} 
          RETURNING * 
          `)
          console.log('Product successfully updated:\n')
          console.table(res.rows)
          return { err : null, data : res.rows }
        } catch (err) {
          console.log(err.stack)
          return { err : err }
        } 
    }

    async deleteProduct (params) {
      const codeSQL = `
      DELETE FROM product
      WHERE id = ${params.deleteID}
      RETURNING * 
      `
      try {
        const res = await params.pool.query(codeSQL)
        console.log('Product successfully deleted:\n')
        console.table(res.rows)
        return { err : null, data : res.rows }
      } catch (err) {
        console.log(err.stack)
        return { err : err }
      } 
    }  
}

module.exports = Product; 
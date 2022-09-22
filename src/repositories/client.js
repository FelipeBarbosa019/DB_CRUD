class Client {

    async createClient(params){
        const codeSQL = `
        INSERT INTO users(type_id, password, email, document)
        VALUES (${params.typeid}, '${params.password}', '${params.email}', '${params.document}')
        RETURNING * 
        `
        try {
          const res = await params.pool.query(codeSQL)
          console.log('User created successfully\n')
          console.table(res.rows)
          return { err : null }
        } catch (err) {
          console.log(err.stack)
          return { err : err }
        } 
    }

    async readClients(_pool){
        try {
          const res = await _pool.query('SELECT * FROM users')
          console.table(res.rows)
          return { err : null, data : res.rows }
        } catch (err) {
          console.log(err.stack)
          return { err : err }
        } 
    }

    async updateClient (params) {
        
        try {
          const res = await params.pool.query(`UPDATE users
          SET type_id = ${params.typeid}, password = '${params.password}', email = '${params.email}', document = '${params.document}', updated_at = now()   
          WHERE id = ${params.where} 
          RETURNING * 
          `)
          console.log('User successfully updated:\n')
          console.table(res.rows)
          return { err : null }
        } catch (err) {
          console.log(err.stack)
          return { err : err }
        } 
    }

    async deleteClient (params) {
      const codeSQL = `
      DELETE FROM users
      WHERE id = ${params.deleteID}
      RETURNING * 
      `
      try {
        const res = await params.pool.query(codeSQL)
        console.log('User successfully deleted:\n')
        console.table(res.rows)
        return { err : null }
      } catch (err) {
        console.log(err.stack)
        return { err : err }
      } 
    }  
}

module.exports = Client; 
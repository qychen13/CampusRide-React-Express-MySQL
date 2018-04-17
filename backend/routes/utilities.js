const query_send_data= (sql) => {
    return (req, res, next)=>{
      // console.log(req.body);
      // console.log(sql);
  	  res.locals.connection.query(
        sql, (error, results, fields) =>{
                if(error) {console.log(error); res.send(JSON.stringify({error: 'Opps, something went wrong. Please retry it.'}));}
                else
                  res.send(JSON.stringify({fields: fields.map((f)=>f.name),
                                          data: results}));

        });
  }
}
const update_data = (sql) =>{
  return (req, res, next) =>{
    // console.log(req.body);
    // console.log(sql);
    res.locals.connection.query(
      sql, (error, results, fields)=>{
        if(error) {console.log(error); res.send(JSON.stringify({error: 'Opps, something went wrong. Please retry it.'}));}
        else res.send(JSON.stringify({message:'Success!'}));
      }
    );
  }
}
module.exports = {query_send_data, update_data};

;

module.exports = (connection) => {
  return (req, res) => {
    let page_id = req.params.id;
    let user_id = req.session.user.user_ID;
    let query = "SELECT * "
      + "FROM User NATURAL JOIN Employee "
      + "WHERE employee_ID = " + page_id + " AND user_ID = " + page_id + ";";

    let query1 = "SELECT * "
      + "FROM Follow JOIN User ON followed_ID = user_ID "
      + "WHERE follower_ID = " + page_id + ";"

    let query2 = "SELECT * "
      + "FROM Speak NATURAL JOIN Language "
      + "WHERE person_ID = " + page_id + ";"

    let query3 = "SELECT * "
    + "FROM Applied JOIN Jobs ON applied_jobID = job_ID "
    + "WHERE applicant_ID = " + page_id + ";"

    connection.query(
      query,
      (error, results, fields) => {
        if (error) {
          console.log(error)
          res.json(error)
        } else {
          //console.log('result is ',results);
          let user = results;
          connection.query(
            query1,
            (error, results, fields) => {
              if (error) {
                console.log(error)
                res.json(error)
              } else {
                //console.log('follow is ',results);
                let follow = results;
                connection.query(
                  query2,
                  (error, results, fields) => {
                    if (error) {
                      console.log(error)
                      res.json(error)
                    } else {
                      let language = results;
                      connection.query(
                        query3,
                        (error, results, fields) => {
                          if (error) {
                            console.log(error)
                            res.json(error)
                          } else {
                            let applied = results;
                            res.render('pages/personal_profile', { user: user[0], id: page_id, follow: follow, user_id: user_id, language: language, applied:applied });
                          }
                        }
                      )
                    }
                  }
                )
              }
            });
        }
      });
  }
}
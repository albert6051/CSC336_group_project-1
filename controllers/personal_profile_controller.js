;

module.exports = (connection) => {
  return (req, res) => {
    let page_id = req.params.id;
    let user_id = req.session.user.user_ID;

    let query = 'CALL getUserProfile(?);';
    let query1 = 'CALL GetFollow(?);';

    connection.query(
      query,
      [page_id],
      (error, results, fields) => {
        if (error) {
          console.log(error)
          res.json(error)
        } else {
          let user = results[0];
          connection.query(
            query1,
            [page_id],
            (error, results, fields) => {
              if (error) {
                console.log(error)
                res.json(error)
              } else {
                let follow = results[0];
                res.render('pages/personal_profile', { data: user, user: user[0], id: page_id, follow: follow, user_id: user_id });
              }
            }
          )
        }
      });
  }
}
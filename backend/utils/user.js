var fetch = require("node-fetch");
const format = require('string-format');
format.extend(String.prototype, {});
var {mysql2query}=require('./database-mysql2.js')

async function findUser(email){
  let sql = 'select * from Student where email=\''+email+'\'';
  const [rows, fields]  = await mysql2query(sql);
  if(rows.length === 0)
    return 0;
  return rows[0].student_id
}
async function createUser(profile){
  let first_name = 'NULL';
  let last_name = 'NULL';
  let email = '\'{}\''.format(profile.email);
  // google profile use given_name and family_name
  if(profile.given_name)
    first_name = '\'{}\''.format(profile.given_name);
  if(profile.family_name)
    last_name = '\'{}\''.format(profile.family_name);
  const sql = 'insert into Student(email, first_name, last_name) values({},{},{})'.format(email, first_name, last_name);
  let result = await mysql2query(sql);
  // console.log(result);
  console.log('Create new user {}'.format(profile.email));
  return await findUser(profile.email);
}

async function findOrCreateUser(req, res, next){
  // get user profile from Auth0
  try{
	const response = await fetch('https://qychen13.auth0.com/userinfo', {headers: {'authorization': req.headers.authorization}});
	const profile = await response.json();
  // console.log(profile);
  let student_id = await findUser(profile.email);
  if(student_id===0)
    student_id = await createUser(profile);
  req.user.student_id = student_id;
  req.body.student_id = student_id; // for the api legancy
  // console.log(req.user);
  next();
	}catch(err){
    console.log(err);
		return res.status(401).send();
	}
}

async function findUserByAppointment(apt_id){
  try{
    const sql = 'select student_id from Appointment where apt_id='+apt_id;
    const [rows, fields] = await mysql2query(sql);
    if(rows.length ===0)
      return 0; // illegal apt_id found
    return rows[0].student_id;
  }catch(err){
    console.log(err);
    return 0; //some error found error found
  }
}

module.exports = {findOrCreateUser, findUserByAppointment};

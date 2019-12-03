const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:secret@localhost:5433/postgres');

const JobListing = sequelize.define('job_listing', { title: Sequelize.TEXT, company: Sequelize.TEXT, yearsOfExperience: Sequelize.INTEGER });

sequelize.sync() // Create tables if necessary
  .then(() => JobListing.truncate()) // Delete all existing rows
  .then(() => Promise.all([ // Insert 3 new rows
    JobListing.create({ title: 'Junior JavaScript developer at Travel company', company: 'TravelBee', yearsOfExperience: 1 }),
    JobListing.create({ title: 'Data Scientist [m/w] at Consulting Agency', company: 'Can-O-Developers', yearsOfExperience: 4 }),
    JobListing.create({ title: 'Web-based Game Developer Urgently Needed', company: 'Rubbery Games', yearsOfExperience: 2 })
  ]))
  .then(() => Promise.all(
    [JobListing.findOne({ where: { company: 'Rubbery Games' } }),
    JobListing.findAll(),
    JobListing.findAll({ where: { yearsOfExperience: { [Sequelize.Op.lt]: 3 } } })
    ]))
  .then(jobList => jobList.flat().map(job => console.log(job.get({ plain: true }))))
  .catch(console.error)
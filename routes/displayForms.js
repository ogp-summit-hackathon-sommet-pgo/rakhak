/* eslint-disable eqeqeq */
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const capture = require('node-server-screenshot');
const screencapture = require('nodejs-screen-capture');

const { ensureAuthenticated } = require('../helpers/auth');

require('../models/DisplayForms');

const DisplayForms = mongoose.model('displayForms');

// DisplayForms index page
router.get('/', ensureAuthenticated, (req, res) => {
  /*   DisplayForms.find({ user: req.user.id })
    .sort({ date: 'desc' })
    .then(displayForms => { */
  res.render('displayForms/index', {});
});

// post form
router.get('/post', ensureAuthenticated, (req, res) => {
  res.render('displayForms/post');
});

// edit form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  DisplayForms.findOne({
    _id: req.params.id,
  }).then(displayForm => {
    if (displayForm.user != req.user.id) {
      req.flash('error_msg', 'Not authorized');
      res.redirect('/displayForms');
    } else {
      res.render('displayForms/edit', {
        // displayForm,
      });
    }
  });
});

// process form
router.post('/', (req, res) => {
  /*   capture.fromURL("http://localhost:5006/displayForms/capture", "./public/images/capture.png", {
    waitMilliseconds: 500,
    clip: {
      x: 235,
      y: 235,
      width: 800,
      height: 500
    }
  }, function(){

  }); */
  screencapture.captureAndSave(
    600,
    400,
    'png',
    './public/images/screenCapture.png'
  );
  res.redirect('/displayForms');

  /* const errors = [];
  if (!req.body.title) {
    errors.push({ text: 'please add a title' });
  }
  if (!req.body.details) {
    errors.push({ text: 'please add a details' });
  }

  if (errors.length > 0) {
    res.render('displayForms/add', {
      errors,
      title: req.body.title,
      details: req.body.details,
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details,
      user: req.user.id,
    };
    new DisplayForms(newUser).save().then(() => {
      req.flash('success_msg', 'displayForms added');
      res.redirect('/displayForms');
    });
  } */
});

// edit form process
router.put('/edit/:id', ensureAuthenticated, (req, res) => {
  /* DisplayForms.findOne({
    _id: req.params.id,
  }).then(displayForms => {
    displayForms.title = req.body.title;
    displayForms.details = req.body.details;

    displayForms.save().then(() => {
      req.flash('success_msg', 'displayForms updated');
      res.redirect('/displayForms');
    });
  }); */
});

// Delete Form
router.delete('/:id', ensureAuthenticated, (req, res) => {
  /* DisplayForms.deleteOne({ _id: req.params.id }).then(() => {
    req.flash('success_msg', 'displayForms removed');
    res.redirect('/displayForms');
  }); */
});

module.exports = router;

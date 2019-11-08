const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', async (req, res) => {
    const { contact_fullname, phone, email,direction,notes } = req.body;
    const newLink = {
        contact_fullname,
         phone,
          email,
          direction,
          notes,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO contacts set ?', [newLink]);
    req.flash('success', 'Link Saved Successfully');
    res.redirect('/links');
});

router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM contacts WHERE user_id = ?', [req.user.id]);
    res.render('links/list', { links });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM contacts WHERE ID = ?', [id]);
    req.flash('success', 'Link Removed Successfully');
    res.redirect('/links');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM contacts WHERE id = ?', [id]);
    console.log(links);
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { contact_fullname,phone,email,direction,notes} = req.body; 
    const newLink = {
        contact_fullname,
        phone,
        email,
        direction,
        notes,
    };
    await pool.query('UPDATE contacts set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link Updated Successfully');
    res.redirect('/links');
});

module.exports = router;
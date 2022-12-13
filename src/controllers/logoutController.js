let handleLogout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.cookie('data', '', { maxAge: 1 });
    res.cookie('connect.sid', '', { maxAge: 1 });
    res.redirect('/');
};

module.exports = { handleLogout: handleLogout };
function validationPassword(password) {
    if (!/^(?=.*[a-zA-Z])(?=.*\d).+$/.test(password)) {
        return next(new Error('El password debe contener al menos una letra y un número.'));
    } else {
        let newPassword = encrypt.hashSync(password, 12);
        return newPassword
    };
};

function validationEmail(email) {
    let emailCheck = email;
    if (this.email) {
        emailCheck.includes('@' && '.' && String);
    } else {
        return next(new Error('El mail no contiene @ y/o . necesarios.'));
    };  
};

module.exports = {
    validationEmail,
    validationPassword
}
/**
 * @param {string} resetLink
 * @param {string} userName
 * @returns {string}
*/

"use strict";

function htmlMail(resetLink, userName) {
    // Image at header of the email hard-coded
    const logo = "data:image/png;base64,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";

    // Style added directly as HTML
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
            <img src=${logo} alt="Logo de la empresa" style="width: 100px; height: auto; margin-bottom: 20px;">
            <h1>Hola, ${userName}</h1>
            <p style="font-size: 18px; margin-bottom: 20px;">Has solicitado restablecer tu contraseña.
            <br> 
            Haz clic en el siguiente enlace para restablecerla:</p>
            <p><a href="${resetLink}" style="background-color: #51a7b5; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">Restablecer Contraseña</a></p>
            <br>
            <p>Si no has solicitado esto, por favor ignora este correo electrónico.</p>
        </div>
    `;
};

module.exports = htmlMail;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const AdminValidation = (req, res, next) => {
    var _a;
    console.log('Verifying admin');
    try {
        //Recogemos datos del payload del token
        const tipo = (_a = req.user) === null || _a === void 0 ? void 0 : _a.tipo;
        console.log(tipo);
        if (tipo != 'admin') {
            return res.json('You are not admin');
        }
        //eres administrador
        console.log('seguent funcio');
        return next();
    }
    catch (_b) {
        return res.status(403).json({ message: 'Forbidden: You do not have permission to perform this action.' });
    }
};
exports.AdminValidation = AdminValidation;

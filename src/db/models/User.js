const { add } = require('winston');

const mongoose = require('../index').mongoose;

const UserSchema = new mongoose.Schema({
    _id: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} não é um e-mail válido!`
        }
    },
    password: {
        type: String,
        required: true,
        // One uppercase, one lowercase, one number and one special character
        validate: {
            validator: function (v) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{8,100}$/.test(v);
            },
            message: props => `${props.value} não é uma senha válida!`
        },
        minlength: 8,
        maxlength: 100,
    },
    salt: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['CORRETOR', 'LÍDER DE EQUIPE', 'DIRETOR', 'STAFF', 'ADMIN'],
        default: 'CORRETOR',
    },
    status: {
        type: String,
        enum: ['ATIVO', 'INATIVO', 'BLOQUEADO', 'EXCLUIDO', 'PENDENTE'],
        default: 'ATIVO',
    },
    validationCode: {
        type: Number,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        // Only numbers
        validate: {
            validator: function (v) {
                return /^\d+$/.test(v);
            },
            message: props => `${props.value} não é um telefone válido!`
        }
    },
    birthdate: {
        type: Date,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        // CPF validation
        validate: {
            validator: function (v) {
                return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(v);
            },
            message: props => `${props.value} não é um CPF válido!`
        }
    },
    rg: {
        type: String,
        required: true,
        // RG validation
        validate: {
            validator: function (v) {
                return /^\d{2}\.\d{3}\.\d{3}-\d{1}$/.test(v);
            },
            message: props => `${props.value} não é um RG válido!`
        }
    },
    sex: {
        type: String,
        enum: ['Masculino', 'Feminino', 'Outro'],
        required: true,
    },
    estadoCivil: {
        type: String,
        enum: ['Solteiro', 'Casado', 'Divorciado', 'Viúvo'],
        required: true,
    },
    addressCep: {
        type: String,
        required: true,
        // CEP validation
        validate: {
            validator: function (v) {
                return /^\d{5}-\d{3}$/.test(v);
            },
            message: props => `${props.value} não é um CEP válido!`
        }
    },
    addressStreet: {
        type: String,
        required: true,
    },
    addressNumber: {
        type: String,
        required: true,
    },
    addressComplement: {
        type: String,
    },
    addressNeighborhood: {
        type: String,
        required: true,
    },
    addressCity: {
        type: String,
        required: true,
    },
    addressState: {
        type: String,
        required: true,
    },
    addressCountry: {
        type: String,
        required: true,
    },

}, { timestamps: true });

// UserSchema.pre('save', function (next) {

// }

const User = mongoose.model('User', UserSchema);

module.exports = User;
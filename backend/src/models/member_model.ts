import { Model, DataTypes, } from "sequelize";
import sequelize from "../config/sequelize";



export interface MemberInterface {
    id?: number;
    name: string;
    age: number;
    email: string;
    fileName: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class Member extends Model implements MemberInterface {
    public id?: number;
    public name!: string;
    public age!: number;
    public email!: string;
    public fileName!: string;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
}

Member.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: new DataTypes.STRING,
        validate: {
            notEmpty: true
        },
        allowNull: false,
    },
    age: {
        type: new DataTypes.INTEGER,
        validate: {
            isInt: {
                msg: "age must be number"
            }
        },
        allowNull: false,
    },
    email: {
        type: new DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: {
                msg: "Email address must be valid"
            }
        },
        allowNull: false,
    },
    fileName: {
        type: new DataTypes.STRING,
        unique: true,
        validate: {
            notEmpty: true
        },
        allowNull: false,
    },

}, {
    tableName: "member",
    freezeTableName: true,
    timestamps: true,
    underscored: false,
    sequelize,
    modelName: "member"
});


export default Member;
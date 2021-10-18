import sequelize from "./config/sequelize";
import Member from "./models/member_model";





const migrationStatus = process.argv[2];

type MigrationType = string;
const migrationTypeUP: MigrationType = "up";
const migrationTypeDOWN: MigrationType = "down";

if (!migrationStatus || (migrationStatus !== migrationTypeUP) && (migrationStatus !== migrationTypeDOWN)) {
    throw new Error("please provide a valid arguments. Either 'up' or 'down' ");
}

export const syncAllModel = () => {
    Member.findByPk(1);
};

const printErrorAndExit = (businessErrMessage: string, err: Error) => {
    syncAllModel();
    console.error(businessErrMessage);
    console.error(err.message);
    process.exit(1);
};

const printSuccessAndExit = (businessSuccessMessage: string) => {
    console.error(businessSuccessMessage);
    process.exit(0);
};

if (migrationStatus === migrationTypeUP) {
    sequelize.sync({ force: true }).then(() => printSuccessAndExit("migrated up successfully!")).catch((e: Error) => {
        printErrorAndExit("failed to migrate up!", e);
    });
}

if (migrationStatus === migrationTypeDOWN) {
    sequelize.drop().then(() => printSuccessAndExit("migrated down successfully!")).catch((e: Error) => {
        printErrorAndExit("failed to migrate down!", e);
    });
}

